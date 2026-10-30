import type { AppData, Task, TaskType } from '../types'

function task(id: string, day: number, start: string, end: string, title: string, type: TaskType, options: Partial<Task> = {}): Task {
  return { id, day, start, end, title, type, notes: '', fixed: type === 'university' || type === 'online' || type === 'work', allowSplit: type === 'study' || type === 'personal' || type === 'other', countsTowardsProgress: type !== 'sleep' && type !== 'rest', ...options }
}
function meal(id: string, day: number, start: string, end: string, title: string) {
  return task(id, day, start, end, title, 'meal', { fixed: false })
}
export function createSeedData(): AppData {
  const now = new Date().toISOString()
  const tasks: Task[] = [
    // الأحد: جامعة دون دوام — جدول المستخدم الأصلي
    task('sun_wake',0,'07:15','07:45','الاستيقاظ والتجهيز','personal',{fixed:false}),
    meal('sun_breakfast',0,'07:45','08:00','الإفطار'),
    task('sun_digital',0,'09:00','10:00','محاضرة المنطق الرقمي (Digital Logic)','university'),
    task('sun_algebra',0,'10:00','11:00','محاضرة الجبر الخطي (Linear Algebra)','university'),
    task('sun_lunch_rest',0,'11:00','13:00','الغداء والراحة','rest',{fixed:false}),
    task('sun_programming',0,'13:00','14:00','محاضرة البرمجة الكينونية (OOP)','university'),
    task('sun_lab',0,'14:00','16:00','مختبر البرمجة الكينونية','university'),
    task('sun_snack',0,'16:00','16:15','وجبة خفيفة','meal',{fixed:false}),
    task('sun_study_oop',0,'16:30','18:30','مذاكرة البرمجة الكينونية','study',{fixed:false,notes:'تدريب عملي وكتابة الأكواد باليد.'}),
    meal('sun_dinner',0,'18:30','19:30','العشاء'),
    task('sun_study_algebra',0,'19:30','21:00','مذاكرة الجبر الخطي','study',{fixed:false}),
    task('sun_review',0,'21:00','21:30','مراجعة أسبوعية','personal',{fixed:false}),
    task('sun_personal',0,'21:30','23:59','وقت شخصي','personal',{fixed:false}),
    task('sun_sleep',0,'23:59','00:00','النوم','sleep'),
    // الاثنين: دوام 9 صباحًا–7 مساءً مع المحاضرات الأونلاين أثناء العمل
    task('mon_wake',1,'08:30','09:00','الاستيقاظ والتجهيز','personal',{fixed:false}),
    task('mon_work',1,'09:00','19:00','العمل','work'),
    task('mon_national',1,'11:00','12:00','محاضرة التربية الوطنية أونلاين','online',{notes:'تُحضر أثناء العمل.'}),
    meal('mon_breakfast',1,'12:00','12:15','الإفطار في الاستراحة'),
    meal('mon_snack',1,'16:30','16:45','وجبة خفيفة في الاستراحة'),
    task('mon_computer',1,'17:00','18:00','محاضرة مهارات الحاسوب أونلاين','online',{notes:'تُحضر أثناء العمل.'}),
    task('mon_home',1,'19:00','19:45','الانتقال إلى البيت','personal',{fixed:true,allowSplit:false}),
    task('mon_study',1,'20:15','21:45','مذاكرة البرمجة الكينونية','study',{fixed:false,notes:'جلسة مذاكرة مدتها ساعة ونصف.'}),
    meal('mon_dinner',1,'21:45','22:15','العشاء'),
    meal('mon_late_snack',1,'22:15','22:30','وجبة خفيفة'),
    task('mon_personal',1,'22:30','23:30','وقت شخصي والاستعداد للنوم','personal',{fixed:false}),
    task('mon_sleep',1,'23:30','23:59','النوم','sleep'),
    // الثلاثاء: الجامعة صباحًا ثم العمل 3–11 مساءً
    task('tue_wake',2,'07:15','08:30','الاستيقاظ والتجهيز','personal',{fixed:false}),
    task('tue_digital',2,'09:00','10:00','محاضرة المنطق الرقمي (Digital Logic)','university'),
    task('tue_algebra',2,'10:00','11:00','محاضرة الجبر الخطي (Linear Algebra)','university'),
    meal('tue_breakfast',2,'11:00','11:15','الإفطار'),
    task('tue_rest',2,'11:50','13:00','راحة وتجهيز للمحاضرة التالية','rest',{fixed:false}),
    task('tue_programming',2,'13:00','14:00','محاضرة البرمجة الكينونية (OOP)','university'),
    meal('tue_snack',2,'14:00','14:15','وجبة خفيفة بعد الجامعة'),
    task('tue_commute',2,'14:15','15:00','الانتقال إلى العمل','personal',{fixed:true,allowSplit:false,notes:'مدة الانتقال 45 دقيقة.'}),
    task('tue_work',2,'15:00','23:00','العمل','work'),
    meal('tue_lunch',2,'17:00','19:00','الغداء في استراحة العمل'),
    meal('tue_portable',2,'19:00','19:30','الوجبة المحمولة'),
    task('tue_home',2,'23:00','23:45','الانتقال من العمل إلى البيت','personal',{fixed:true,allowSplit:false,notes:'مدة الانتقال 45 دقيقة بحسب توضيح المستخدم.'}),
    meal('tue_dinner',2,'23:45','23:59','عشاء خفيف'),
    task('tue_sleep',2,'00:30','07:15','النوم','sleep'),
    // الأربعاء: دوام صباحي ومحاضرات أونلاين
    task('wed_wake',3,'08:30','09:00','الاستيقاظ والتجهيز','personal',{fixed:false}),
    task('wed_work',3,'09:00','19:00','العمل','work'),
    task('wed_national',3,'11:00','12:00','محاضرة التربية الوطنية أونلاين','online',{notes:'تُحضر أثناء العمل.'}),
    meal('wed_breakfast',3,'12:00','12:15','الإفطار في الاستراحة'),
    meal('wed_snack',3,'16:30','16:45','وجبة خفيفة في الاستراحة'),
    task('wed_computer',3,'17:00','18:00','محاضرة مهارات الحاسوب أونلاين','online',{notes:'تُحضر أثناء العمل.'}),
    task('wed_home',3,'19:00','19:45','الانتقال إلى البيت','personal',{fixed:true,allowSplit:false}),
    task('wed_study',3,'20:15','21:45','مذاكرة المنطق الرقمي','study',{fixed:false,notes:'جلسة مذاكرة مدتها ساعة ونصف.'}),
    meal('wed_dinner',3,'21:45','22:15','العشاء'),
    meal('wed_late_snack',3,'22:15','22:30','وجبة خفيفة'),
    task('wed_personal',3,'22:30','23:30','وقت شخصي والاستعداد للنوم','personal',{fixed:false}),
    task('wed_sleep',3,'23:30','23:59','النوم','sleep'),
    // الخميس: نفس جدول الثلاثاء
    task('thu_wake',4,'07:15','08:30','الاستيقاظ والتجهيز','personal',{fixed:false}),
    task('thu_digital',4,'09:00','10:00','محاضرة المنطق الرقمي (Digital Logic)','university'),
    task('thu_algebra',4,'10:00','11:00','محاضرة الجبر الخطي (Linear Algebra)','university'),
    meal('thu_breakfast',4,'11:00','11:15','الإفطار'),
    task('thu_rest',4,'11:50','13:00','راحة وتجهيز للمحاضرة التالية','rest',{fixed:false}),
    task('thu_programming',4,'13:00','14:00','محاضرة البرمجة الكينونية (OOP)','university'),
    meal('thu_snack',4,'14:00','14:15','وجبة خفيفة بعد الجامعة'),
    task('thu_commute',4,'14:15','15:00','الانتقال إلى العمل','personal',{fixed:true,allowSplit:false,notes:'مدة الانتقال 45 دقيقة.'}),
    task('thu_work',4,'15:00','23:00','العمل','work'),
    meal('thu_lunch',4,'17:00','19:00','الغداء في استراحة العمل'),
    meal('thu_portable',4,'19:00','19:30','الوجبة المحمولة'),
    task('thu_home',4,'23:00','23:45','الانتقال من العمل إلى البيت','personal',{fixed:true,allowSplit:false,notes:'مدة الانتقال 45 دقيقة بحسب توضيح المستخدم.'}),
    meal('thu_dinner',4,'23:45','23:59','عشاء خفيف'),
    task('thu_sleep',4,'00:30','07:15','النوم','sleep'),
    // الجمعة: دوام دون محاضرات
    task('fri_wake',5,'08:30','09:00','الاستيقاظ والتجهيز','personal',{fixed:false}),
    task('fri_work',5,'09:00','19:00','العمل','work'),
    meal('fri_breakfast',5,'12:00','12:15','الإفطار في الاستراحة'),
    meal('fri_snack',5,'16:30','16:45','وجبة خفيفة في الاستراحة'),
    task('fri_home',5,'19:00','19:45','الانتقال إلى البيت ثم الغداء','personal',{fixed:true,allowSplit:false}),
    task('fri_study',5,'20:15','21:45','مذاكرة البرمجة الكينونية','study',{fixed:false,notes:'جلسة مذاكرة مدتها ساعة ونصف.'}),
    meal('fri_dinner',5,'21:45','22:15','العشاء'),
    meal('fri_late_snack',5,'22:15','22:30','وجبة خفيفة'),
    task('fri_personal',5,'22:30','23:30','وقت شخصي','personal',{fixed:false}),
    task('fri_sleep',5,'23:30','23:59','النوم','sleep'),
    // السبت: دوام ومحاضرات أونلاين أثناء العمل
    task('sat_wake',6,'08:30','09:00','الاستيقاظ والتجهيز','personal',{fixed:false}),
    task('sat_work',6,'09:00','19:00','العمل','work'),
    task('sat_national',6,'11:00','12:00','محاضرة التربية الوطنية أونلاين','online',{notes:'تُحضر أثناء العمل.'}),
    meal('sat_breakfast',6,'12:00','12:15','الإفطار في الاستراحة'),
    meal('sat_snack',6,'16:30','16:45','وجبة خفيفة في الاستراحة'),
    task('sat_computer',6,'17:00','18:00','محاضرة مهارات الحاسوب أونلاين','online',{notes:'تُحضر أثناء العمل.'}),
    task('sat_home',6,'19:00','19:45','الانتقال إلى البيت ثم الغداء','personal',{fixed:true,allowSplit:false}),
    task('sat_study',6,'20:15','21:15','مذاكرة الجبر الخطي','study',{fixed:false}),
    task('sat_personal',6,'21:15','21:45','وقت شخصي','personal',{fixed:false}),
    meal('sat_dinner',6,'21:45','22:15','العشاء'),
    meal('sat_late_snack',6,'22:15','22:30','وجبة خفيفة'),
    task('sat_sleep',6,'23:30','23:59','النوم','sleep'),
  ]
  return {
    schemaVersion: 3, tasks,
    goals: [
      { id: 'goal_study', name: 'المذاكرة الذاتية', description: 'هدف أسبوعي قابل للتعديل', target: 9, current: 0, unit: 'ساعة', status: 'active', createdAt: now },
      { id: 'goal_reading', name: 'القراءة', description: 'هدف أسبوعي قابل للتعديل', target: 5, current: 0, unit: 'جلسة', status: 'active', createdAt: now },
    ],
    notes: [], completions: {}, checkins: [], weightHistory: [], achievements: [], incidents: [],
    settings: { displayName: '', streakTarget: 70, theme: 'light', nutritionGoal: 'balanced' },
    createdAt: now, updatedAt: now,
  }
}

/** Empty starter data for people who want to build their own weekly schedule. */
export function createBlankSeedData(): AppData {
  const now = new Date().toISOString()
  return { schemaVersion: 3, tasks: [], goals: [], notes: [], completions: {}, checkins: [], weightHistory: [], achievements: [], incidents: [], settings: { displayName: '', streakTarget: 70, theme: 'light', nutritionGoal: 'balanced' }, createdAt: now, updatedAt: now }
}
