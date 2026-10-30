import type { AppData, Task, TaskType } from '../types'

function task(id: string, day: number, start: string, end: string, title: string, type: TaskType, options: Partial<Task> = {}): Task {
  return {
    id, day, start, end, title, type, notes: '',
    fixed: type === 'university' || type === 'online' || type === 'work',
    allowSplit: type === 'study' || type === 'personal' || type === 'other',
    countsTowardsProgress: type !== 'sleep' && type !== 'rest',
    ...options,
  }
}

function meals(day: number, breakfast: string, snack: string, lunch: string, dinner: string): Task[] {
  return [
    task(`meal_${day}_breakfast`, day, breakfast, addMinutes(breakfast, 15), 'الإفطار', 'meal', { fixed: false }),
    task(`meal_${day}_snack`, day, snack, addMinutes(snack, 15), 'وجبة خفيفة', 'meal', { fixed: false }),
    task(`meal_${day}_lunch`, day, lunch, addMinutes(lunch, 30), 'الغداء', 'meal', { fixed: false }),
    task(`meal_${day}_dinner`, day, dinner, addMinutes(dinner, 30), 'العشاء', 'meal', { fixed: false }),
  ]
}
function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = (h * 60 + m + minutes) % 1440
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

export function createSeedData(): AppData {
  const now = new Date().toISOString()
  const tasks: Task[] = [
    // الأحد — يوم الجامعة دون دوام
    task('sun_sleep', 0, '00:00', '07:15', 'النوم', 'sleep'),
    task('sun_wake', 0, '07:15', '07:45', 'الاستيقاظ والتجهيز', 'personal', { fixed: false }),
    task('sun_breakfast', 0, '07:45', '08:00', 'الإفطار', 'meal', { fixed: false }),
    task('sun_digital', 0, '09:00', '10:00', 'محاضرة المنطق الرقمي (Digital Logic)', 'university'),
    task('sun_algebra', 0, '10:00', '11:00', 'محاضرة الجبر الخطي (Linear Algebra)', 'university'),
    task('sun_lunch_rest', 0, '11:00', '13:00', 'الغداء والراحة', 'rest', { fixed: false, notes: 'فترة مرنة للغداء والراحة.' }),
    task('sun_programming', 0, '13:00', '14:00', 'محاضرة البرمجة الكينونية (OOP)', 'university'),
    task('sun_lab', 0, '14:00', '16:00', 'مختبر البرمجة الكينونية', 'university'),
    task('sun_study_oop', 0, '16:30', '18:30', 'مذاكرة البرمجة الكينونية', 'study', { fixed: false }),
    task('sun_dinner', 0, '18:30', '19:30', 'العشاء', 'meal', { fixed: false }),
    task('sun_study_algebra', 0, '19:30', '21:00', 'مذاكرة الجبر الخطي', 'study', { fixed: false }),
    task('sun_review', 0, '21:00', '21:30', 'مراجعة أسبوعية', 'personal', { fixed: false }),
    task('sun_personal', 0, '21:30', '23:59', 'وقت شخصي', 'personal', { fixed: false }),
    // الاثنين — دوام صباحي ومحاضرة أونلاين أثناء العمل
    task('mon_wake', 1, '08:30', '09:00', 'الاستيقاظ والتجهيز', 'personal', { fixed: false }),
    task('mon_work', 1, '09:00', '19:00', 'العمل', 'work'),
    task('mon_national', 1, '11:00', '12:00', 'محاضرة التربية الوطنية أونلاين', 'online', { notes: 'تُحضر أثناء الاستراحة/العمل حسب الترتيب المتاح.' }),
    task('mon_breakfast', 1, '12:00', '12:15', 'الإفطار في الاستراحة', 'meal', { fixed: false }, { notes: 'في استراحة العمل.' }),
    task('mon_snack', 1, '16:30', '16:45', 'وجبة خفيفة في الاستراحة', 'meal', { fixed: false }, { notes: 'في استراحة العمل.' }),
    task('mon_computer', 1, '17:00', '18:00', 'محاضرة مهارات الحاسوب أونلاين', 'online', { notes: 'تُحضر أثناء العمل.' }),
    task('mon_home', 1, '19:00', '19:45', 'الانتقال إلى البيت', 'personal', { fixed: true, allowSplit: false }),
    task('mon_study', 1, '20:00', '21:30', 'مذاكرة البرمجة الكينونية', 'study', { fixed: false }),
    task('mon_dinner', 1, '21:30', '22:00', 'العشاء', 'meal', { fixed: false }),
    task('mon_personal', 1, '22:00', '23:30', 'وقت شخصي والاستعداد للنوم', 'personal', { fixed: false }),
    task('mon_sleep', 1, '23:30', '23:59', 'النوم', 'sleep'),
    // الثلاثاء — جامعة صباحاً ثم العمل حتى 11 مساءً
    task('tue_sleep', 2, '00:30', '07:15', 'النوم', 'sleep'),
    task('tue_wake', 2, '07:15', '08:30', 'الاستيقاظ والتجهيز', 'personal', { fixed: false }),
    task('tue_digital', 2, '09:00', '10:00', 'محاضرة المنطق الرقمي (Digital Logic)', 'university'),
    task('tue_algebra', 2, '10:00', '11:00', 'محاضرة الجبر الخطي (Linear Algebra)', 'university'),
    task('tue_breakfast', 2, '11:00', '11:15', 'الإفطار', 'meal', { fixed: false }),
    task('tue_rest', 2, '11:50', '13:00', 'راحة وتجهيز للمحاضرة التالية', 'rest', { fixed: false }),
    task('tue_programming', 2, '13:00', '14:00', 'محاضرة البرمجة الكينونية (OOP)', 'university'),
    task('tue_snack', 2, '14:00', '14:15', 'وجبة خفيفة', 'meal', { fixed: false }),
    task('tue_commute', 2, '14:15', '15:00', 'الانتقال إلى العمل', 'personal', { fixed: true, allowSplit: false, notes: 'مدة الانتقال 45 دقيقة.' }),
    task('tue_work', 2, '15:00', '23:00', 'العمل', 'work'),
    task('tue_lunch', 2, '17:00', '17:30', 'الغداء في استراحة العمل', 'meal', { fixed: false }, { notes: 'في استراحة العمل.' }),
    task('tue_portable', 2, '19:00', '19:30', 'الوجبة المحمولة — تُحدّث من مساعدي الغذائي', 'meal', { fixed: false }, { notes: 'في استراحة العمل.' }),
    task('tue_home', 2, '23:00', '23:45', 'الانتقال من العمل إلى البيت', 'personal', { fixed: true, allowSplit: false, notes: 'مدة الانتقال 45 دقيقة.' }),
    task('tue_dinner', 2, '23:45', '23:59', 'العشاء', 'meal', { fixed: false }),
    // الأربعاء — دوام صباحي ومحاضرات أونلاين
    task('wed_wake', 3, '08:30', '09:00', 'الاستيقاظ والتجهيز', 'personal', { fixed: false }),
    task('wed_work', 3, '09:00', '19:00', 'العمل', 'work'),
    task('wed_national', 3, '11:00', '12:00', 'محاضرة التربية الوطنية أونلاين', 'online', { notes: 'تُحضر أثناء العمل.' }),
    task('wed_breakfast', 3, '12:00', '12:15', 'الإفطار في الاستراحة', 'meal', { fixed: false }, { notes: 'في استراحة العمل.' }),
    task('wed_snack', 3, '16:30', '16:45', 'وجبة خفيفة في الاستراحة', 'meal', { fixed: false }, { notes: 'في استراحة العمل.' }),
    task('wed_computer', 3, '17:00', '18:00', 'محاضرة مهارات الحاسوب أونلاين', 'online', { notes: 'تُحضر أثناء العمل.' }),
    task('wed_home', 3, '19:00', '19:45', 'الانتقال إلى البيت', 'personal', { fixed: true, allowSplit: false }),
    task('wed_study', 3, '20:00', '21:30', 'مذاكرة المنطق الرقمي', 'study', { fixed: false }),
    task('wed_dinner', 3, '21:30', '22:00', 'العشاء', 'meal', { fixed: false }),
    task('wed_personal', 3, '22:00', '23:30', 'وقت شخصي والاستعداد للنوم', 'personal', { fixed: false }),
    task('wed_sleep', 3, '23:30', '23:59', 'النوم', 'sleep'),
    // الخميس — جامعة صباحاً ثم العمل حتى 11 مساءً
    task('thu_sleep', 4, '00:30', '07:15', 'النوم', 'sleep'),
    task('thu_wake', 4, '07:15', '08:30', 'الاستيقاظ والتجهيز', 'personal', { fixed: false }),
    task('thu_digital', 4, '09:00', '10:00', 'محاضرة المنطق الرقمي (Digital Logic)', 'university'),
    task('thu_algebra', 4, '10:00', '11:00', 'محاضرة الجبر الخطي (Linear Algebra)', 'university'),
    task('thu_breakfast', 4, '11:00', '11:15', 'الإفطار', 'meal', { fixed: false }),
    task('thu_rest', 4, '11:50', '13:00', 'راحة وتجهيز للمحاضرة التالية', 'rest', { fixed: false }),
    task('thu_programming', 4, '13:00', '14:00', 'محاضرة البرمجة الكينونية (OOP)', 'university'),
    task('thu_snack', 4, '14:00', '14:15', 'وجبة خفيفة', 'meal', { fixed: false }),
    task('thu_commute', 4, '14:15', '15:00', 'الانتقال إلى العمل', 'personal', { fixed: true, allowSplit: false, notes: 'مدة الانتقال 45 دقيقة.' }),
    task('thu_work', 4, '15:00', '23:00', 'العمل', 'work'),
    task('thu_lunch', 4, '17:00', '17:30', 'الغداء في استراحة العمل', 'meal', { fixed: false }, { notes: 'في استراحة العمل.' }),
    task('thu_portable', 4, '19:00', '19:30', 'الوجبة المحمولة — تُحدّث من مساعدي الغذائي', 'meal', { fixed: false }, { notes: 'في استراحة العمل.' }),
    task('thu_home', 4, '23:00', '23:45', 'الانتقال من العمل إلى البيت', 'personal', { fixed: true, allowSplit: false }),
    task('thu_dinner', 4, '23:45', '23:59', 'العشاء', 'meal', { fixed: false }),
    // الجمعة — دوام صباحي
    task('fri_wake', 5, '08:30', '09:00', 'الاستيقاظ والتجهيز', 'personal', { fixed: false }),
    task('fri_work', 5, '09:00', '19:00', 'العمل', 'work'),
    task('fri_breakfast', 5, '12:00', '12:15', 'الإفطار في الاستراحة', 'meal', { fixed: false }),
    task('fri_snack', 5, '16:30', '16:45', 'وجبة خفيفة في الاستراحة', 'meal', { fixed: false }),
    task('fri_home', 5, '19:00', '19:45', 'الانتقال إلى البيت', 'personal', { fixed: true, allowSplit: false }),
    task('fri_study', 5, '20:00', '21:30', 'مذاكرة البرمجة الكينونية', 'study', { fixed: false }),
    task('fri_dinner', 5, '21:30', '22:00', 'العشاء', 'meal', { fixed: false }),
    task('fri_personal', 5, '22:00', '23:30', 'وقت شخصي', 'personal', { fixed: false }),
    task('fri_sleep', 5, '23:30', '23:59', 'النوم', 'sleep'),
    // السبت — دوام صباحي ومحاضرات أونلاين أثناء العمل
    task('sat_wake', 6, '08:30', '09:00', 'الاستيقاظ والتجهيز', 'personal', { fixed: false }),
    task('sat_work', 6, '09:00', '19:00', 'العمل', 'work'),
    task('sat_national', 6, '11:00', '12:00', 'محاضرة التربية الوطنية أونلاين', 'online', { notes: 'تُحضر أثناء العمل.' }),
    task('sat_breakfast', 6, '12:00', '12:15', 'الإفطار في الاستراحة', 'meal', { fixed: false }, { notes: 'في استراحة العمل.' }),
    task('sat_snack', 6, '16:30', '16:45', 'وجبة خفيفة في الاستراحة', 'meal', { fixed: false }, { notes: 'في استراحة العمل.' }),
    task('sat_computer', 6, '17:00', '18:00', 'محاضرة مهارات الحاسوب أونلاين', 'online', { notes: 'تُحضر أثناء العمل.' }),
    task('sat_home', 6, '19:00', '19:45', 'الانتقال إلى البيت', 'personal', { fixed: true, allowSplit: false }),
    task('sat_study', 6, '20:00', '21:00', 'مذاكرة الجبر الخطي', 'study', { fixed: false }),
    task('sat_dinner', 6, '21:00', '21:30', 'العشاء', 'meal', { fixed: false }),
    task('sat_personal', 6, '21:30', '23:30', 'وقت شخصي', 'personal', { fixed: false }),
    task('sat_sleep', 6, '23:30', '23:59', 'النوم', 'sleep'),
  ]
  return {
    schemaVersion: 2, tasks,
    goals: [
      { id: 'goal_study', name: 'المذاكرة الذاتية', description: 'هدف أسبوعي قابل للتعديل', target: 9, current: 0, unit: 'ساعة', status: 'active', createdAt: now },
      { id: 'goal_reading', name: 'القراءة', description: 'هدف أسبوعي قابل للتعديل', target: 5, current: 0, unit: 'جلسة', status: 'active', createdAt: now },
    ],
    notes: [], completions: {}, checkins: [], weightHistory: [], achievements: [], incidents: [],
    settings: { displayName: '', streakTarget: 70, theme: 'light' },
    createdAt: now, updatedAt: now,
  }
}
