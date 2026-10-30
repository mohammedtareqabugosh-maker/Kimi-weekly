# إعداد تسجيل الدخول والمزامنة لـ NASSQ

تحتاج النسخة المنشورة إلى مشروع Supabase تملكه. لا تُضمّن مفتاح service_role في التطبيق.

## 1. إعداد مفاتيح النشر
أضف هذين المتغيرين إلى إعدادات البناء في GitHub Actions (Repository Settings → Secrets and variables → Actions → Variables أو Secrets):
- `VITE_SUPABASE_URL`: رابط مشروع Supabase.
- `VITE_SUPABASE_ANON_KEY`: المفتاح العام publishable/anon للمشروع.

في خطوة البناء داخل `source` مرّر المتغيرين إلى بيئة الأمر `pnpm run build`. هذه القيم تُضمّن في الواجهة، لذا يجب استخدام المفتاح العام فقط مع RLS مفعّل.

## 2. إنشاء جدول البيانات وسياسات العزل
نفّذ SQL التالي في Supabase → SQL Editor:

```sql
create table if not exists public.user_app_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.user_app_data enable row level security;

drop policy if exists "Users can read their own app data" on public.user_app_data;
create policy "Users can read their own app data"
on public.user_app_data for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own app data" on public.user_app_data;
create policy "Users can insert their own app data"
on public.user_app_data for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own app data" on public.user_app_data;
create policy "Users can update their own app data"
on public.user_app_data for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

grant select, insert, update on public.user_app_data to authenticated;
```

## 3. تفعيل البريد وGoogle
في Authentication → URL Configuration أضف عنوان GitHub Pages المنشور إلى Site URL / Redirect URLs.
في Authentication → Providers فعّل Email، ثم فعّل Google وأدخل Client ID وClient Secret اللذين تنشئهما في Google Cloud Console. أضف عنوان callback الذي يعرضه Supabase إلى إعدادات OAuth في Google Cloud. يجب إضافة عنوان كل نسخة منشورة إلى Redirect URLs في Supabase.

## 4. نشر المتغيرات
يجب أن تستخدم workflow متغيرات البيئة أثناء البناء، ثم أعد تشغيل workflow. لا يكفي إضافة ملف `.env` بعد نشر الموقع لأن GitHub Pages يستضيف ملفات البناء الثابتة.

## سلوك البيانات
بعد تسجيل الدخول، يقرأ التطبيق بيانات الحساب من `user_app_data`. عند أول استخدام، يربط بيانات الجهاز القديمة بحساب المستخدم الأول على هذا المتصفح؛ بعد ذلك تُحفظ البيانات محليًا في مساحة منفصلة لكل حساب. عند وجود بيانات محلية وسحابية، يعتمد الاختيار على آخر وقت تحديث. أخطاء المزامنة تمنع فتح التطبيق بدل عرض بيانات حساب آخر.
