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
في Authentication → URL Configuration أضف الرابطين التاليين إلى قائمة Redirect URLs (مع المسار كاملًا):
- `https://mohammedtareqabugosh-maker.github.io/Kimi-weekly/`
- `https://mohammedtareqabugosh-maker.github.io/kimi-jadwali/?template=blank`
اختر أحدهما كـ Site URL، وأبقِ الرابطين في Redirect URLs.
في Authentication → Providers فعّل Email، ثم فعّل Google وأدخل Client ID وClient Secret اللذين تنشئهما في Google Cloud Console. أضف عنوان callback الذي يعرضه Supabase إلى إعدادات OAuth في Google Cloud. يجب إضافة عنوان كل نسخة منشورة إلى Redirect URLs في Supabase.

## 4. نشر المتغيرات
يجب أن تستخدم workflow متغيرات البيئة أثناء البناء، ثم أعد تشغيل workflow. لا يكفي إضافة ملف `.env` بعد نشر الموقع لأن GitHub Pages يستضيف ملفات البناء الثابتة.

## سلوك البيانات
بعد تسجيل الدخول، يقرأ التطبيق بيانات الحساب من `user_app_data`. عند أول استخدام، يربط بيانات الجهاز القديمة بحساب المستخدم الأول على هذا المتصفح؛ بعد ذلك تُحفظ البيانات محليًا في مساحة منفصلة لكل حساب. عند وجود بيانات محلية وسحابية، يعتمد الاختيار على آخر وقت تحديث. أخطاء المزامنة تمنع فتح التطبيق بدل عرض بيانات حساب آخر.

## الجدول الأسبوعي المشترك بين نَسّق وصحن
صفحة «الجدول الموحد» تستخدم جدول `public.shared_schedule`. إنشاء `user_app_data` وحده لا يكفي. نفّذ هذا أيضًا في SQL Editor:

```sql
create table if not exists public.shared_schedule (
  id text primary key default gen_random_uuid()::text,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('task', 'appointment', 'meal')),
  title text not null,
  details text not null default '',
  starts_at timestamptz not null,
  meal_type text not null default '',
  calories numeric not null default 0,
  protein numeric not null default 0,
  carbs numeric not null default 0,
  fat numeric not null default 0,
  ingredients text not null default '',
  source_app text not null default '',
  priority text not null default 'medium' check (priority in ('high', 'medium', 'low')),
  progress_notes jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists shared_schedule_user_time_idx
  on public.shared_schedule (user_id, starts_at);

alter table public.shared_schedule enable row level security;
drop policy if exists "Users manage own shared schedule" on public.shared_schedule;
drop policy if exists "Users can read own shared schedule" on public.shared_schedule;
drop policy if exists "Users can insert own shared schedule" on public.shared_schedule;
drop policy if exists "Users can update own shared schedule" on public.shared_schedule;
drop policy if exists "Users can delete own shared schedule" on public.shared_schedule;
create policy "Users can read own shared schedule" on public.shared_schedule
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can insert own shared schedule" on public.shared_schedule
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can update own shared schedule" on public.shared_schedule
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "Users can delete own shared schedule" on public.shared_schedule
  for delete to authenticated using ((select auth.uid()) = user_id);
grant select, insert, update, delete on public.shared_schedule to authenticated;
```

استخدم المشروع نفسه والحساب نفسه في التطبيقين. إذا كان الجدول موجودًا بالفعل، لا تحذفه ولا تعِد إنشاءه؛ راجع الأعمدة وسياسات RLS فقط.

