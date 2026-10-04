import type { Lang } from '@/i18n/translations'

// The legal pages: privacy policy, terms and account deletion, in both languages.
// They describe what the app and the API actually do — keep them in step with the code
// (what a deleted account loses, what venues see, how long an unpaid booking holds its slot).

export const SUPPORT_EMAIL = 'support@playmakerjo.com'

export type Block =
  | { p: string }
  | { list: string[] }
  | { steps: string[] }
  | { mailto: { label: string; subject: string } }

export interface LegalSection {
  heading: string
  blocks: Block[]
}

export interface LegalDoc {
  title: string
  updated: string
  intro: string[]
  sections: LegalSection[]
}

export type LegalPageKey = 'privacy' | 'terms' | 'deleteAccount'

const UPDATED = { en: '4 October 2026', ar: '4 تشرين الأول 2026' }

const privacyEn: LegalDoc = {
  title: 'Privacy Policy',
  updated: UPDATED.en,
  intro: [
    'PlayMaker JO ("PlayMaker", "we") runs the PlayMaker JO app, the venue dashboard and this website. This policy explains what personal data we collect, why we use it, who we share it with, and the choices you have.',
    'It covers players who book through the app, and venue owners and their staff who use the dashboard.',
  ],
  sections: [
    {
      heading: 'What we collect',
      blocks: [
        {
          list: [
            'Account details: your name, email address, phone number and password. Passwords are stored only in a scrambled (hashed) form that we cannot read. If you sign in with Google or Apple, they share your name and email address with us.',
            'Bookings: the venue, pitch, sport, date, time and price of each booking, its status, and any cancellation or refund.',
            'Payments: we do not take card payments. When you pay a deposit by CliQ, we keep the screenshot of the transfer you upload and the amounts paid and refunded.',
            'Location: if you allow it, the app uses your phone’s location to show venues near you. It is used on your phone only and is not sent to or stored on our servers.',
            'Notifications: a device token from Google Firebase Cloud Messaging, so we can send booking updates to your phone.',
            'Reviews and favourites: the ratings and comments you post and the venues you save.',
            'Technical data: like most online services, our servers record basic logs (such as IP address, time and the request made) to keep the service working and secure.',
            'Venue owners and staff: business and venue details, the CliQ alias used to receive deposits, team members and their roles, subscription invoices, and a record of actions taken in the dashboard (who changed what, and when).',
          ],
        },
        { p: 'We do not use advertising trackers, and we do not sell your data.' },
      ],
    },
    {
      heading: 'How we use it',
      blocks: [
        {
          list: [
            'To create your account and sign you in.',
            'To make, confirm, move and cancel bookings, and to record payments and refunds.',
            'To send notifications about your bookings and your account.',
            'To answer support requests and help settle disputes between players and venues.',
            'To keep the service secure and to prevent fraud and abuse.',
            'To bill venues for their subscription and for bookings made through the app.',
          ],
        },
      ],
    },
    {
      heading: 'Who we share it with',
      blocks: [
        {
          list: [
            'The venue you book: your name, phone number and the booking details, so the venue can manage the booking and contact you about it. Venues may keep their own record of you as a customer. We do not give venues your email address.',
            'Service providers that help us run PlayMaker: Hetzner Online (our servers), Google Firebase (push notifications), Google and Apple (if you choose to sign in with them) and OpenStreetMap (map images).',
            'Authorities, when the law requires it, or when needed to protect the safety and rights of our users and of PlayMaker.',
          ],
        },
        { p: 'We do not sell or rent your personal data to anyone.' },
      ],
    },
    {
      heading: 'Where your data is stored',
      blocks: [
        {
          p: 'Our servers are hosted by Hetzner Online outside Jordan, and Google and Apple may process data in other countries. We only use providers that protect data to recognised standards.',
        },
      ],
    },
    {
      heading: 'How long we keep it',
      blocks: [
        {
          list: [
            'Your account details are kept while your account is open.',
            'When you delete your account, your name, email address, phone number, photo and password are removed straight away, and your favourites, notifications and registered devices are deleted.',
            'Booking and payment records, including payment screenshots, are kept without your name or contact details, because venues and PlayMaker need them for their financial records and to resolve disputes. They are kept only as long as needed for that and as the law requires.',
            'A venue may keep the name and phone number it holds in its own customer list.',
            'Server logs are kept for a limited time for security.',
          ],
        },
        { p: 'See how to delete your account at playmakerjo.com/delete-account.' },
      ],
    },
    {
      heading: 'Your choices',
      blocks: [
        {
          list: [
            'Update your name, phone number and photo in the app, under Profile.',
            'Delete your account in the app (Profile → Delete account), or by asking us — see playmakerjo.com/delete-account.',
            'Turn off notifications in the app or in your phone’s settings, and turn off location access in your phone’s settings.',
            'Ask us for a copy of your data, or to correct it, by emailing support@playmakerjo.com.',
          ],
        },
      ],
    },
    {
      heading: 'Security',
      blocks: [
        {
          p: 'Data travels over encrypted connections (HTTPS). Passwords are stored hashed, the app keeps your sign-in in your phone’s secure storage, and only people who need it can access personal data. No system is completely secure; if a breach affects your data, we will tell you as the law requires.',
        },
      ],
    },
    {
      heading: 'Children',
      blocks: [
        {
          p: 'PlayMaker JO is not meant for children under 13, and we do not knowingly collect their data. If you believe a child has given us personal data, contact us and we will delete it.',
        },
      ],
    },
    {
      heading: 'Changes to this policy',
      blocks: [
        {
          p: 'When we change this policy we update the date at the top, and we tell you in the app about important changes.',
        },
      ],
    },
    {
      heading: 'Contact',
      blocks: [{ p: 'PlayMaker JO, Amman, Jordan — support@playmakerjo.com' }],
    },
  ],
}

const privacyAr: LegalDoc = {
  title: 'سياسة الخصوصية',
  updated: UPDATED.ar,
  intro: [
    'تدير PlayMaker JO ("PlayMaker" أو "نحن") تطبيق PlayMaker JO ولوحة تحكم الملاعب وهذا الموقع. توضّح هذه السياسة البيانات الشخصية التي نجمعها، ولماذا نستخدمها، ومع من نشاركها، والخيارات المتاحة لك.',
    'تشمل هذه السياسة اللاعبين الذين يحجزون عبر التطبيق، وأصحاب الملاعب وموظفيهم الذين يستخدمون لوحة التحكم.',
  ],
  sections: [
    {
      heading: 'البيانات التي نجمعها',
      blocks: [
        {
          list: [
            'بيانات الحساب: اسمك وبريدك الإلكتروني ورقم هاتفك وكلمة المرور. تُخزَّن كلمات المرور بصيغة مشفّرة لا يمكننا قراءتها. إذا سجّلت الدخول عبر Google أو Apple، فإنهما يشاركان معنا اسمك وبريدك الإلكتروني.',
            'الحجوزات: الملعب والأرضية والرياضة والتاريخ والوقت والسعر لكل حجز، وحالته، وأي إلغاء أو استرداد.',
            'المدفوعات: لا نستقبل الدفع بالبطاقات. عند دفع العربون عبر كليك (CliQ)، نحتفظ بلقطة شاشة التحويل التي ترفعها وبالمبالغ المدفوعة والمستردة.',
            'الموقع: إذا سمحت بذلك، يستخدم التطبيق موقع هاتفك لعرض الملاعب القريبة منك. يُستخدم الموقع على هاتفك فقط، ولا يُرسَل إلى خوادمنا ولا يُخزَّن عليها.',
            'الإشعارات: رمز جهاز من خدمة Google Firebase Cloud Messaging لنتمكّن من إرسال تحديثات الحجز إلى هاتفك.',
            'التقييمات والمفضلة: التقييمات والتعليقات التي تنشرها والملاعب التي تحفظها.',
            'البيانات التقنية: كمعظم الخدمات الإلكترونية، تسجّل خوادمنا سجلات أساسية (مثل عنوان IP والوقت والطلب المُرسَل) للحفاظ على عمل الخدمة وأمانها.',
            'أصحاب الملاعب والموظفون: بيانات النشاط التجاري والملاعب، واسم كليك المستخدم لاستلام العربون، وأعضاء الفريق وأدوارهم، وفواتير الاشتراك، وسجلّ بالإجراءات التي تتم في لوحة التحكم (من غيّر ماذا ومتى).',
          ],
        },
        { p: 'لا نستخدم أدوات تتبّع إعلانية، ولا نبيع بياناتك.' },
      ],
    },
    {
      heading: 'كيف نستخدمها',
      blocks: [
        {
          list: [
            'لإنشاء حسابك وتسجيل دخولك.',
            'لإنشاء الحجوزات وتأكيدها ونقلها وإلغائها، ولتسجيل المدفوعات والمبالغ المستردة.',
            'لإرسال إشعارات حول حجوزاتك وحسابك.',
            'للرد على طلبات الدعم والمساعدة في حل النزاعات بين اللاعبين والملاعب.',
            'للحفاظ على أمان الخدمة ومنع الاحتيال وإساءة الاستخدام.',
            'لإصدار فواتير الاشتراك للملاعب وعمولة الحجوزات التي تتم عبر التطبيق.',
          ],
        },
      ],
    },
    {
      heading: 'مع من نشاركها',
      blocks: [
        {
          list: [
            'الملعب الذي تحجزه: اسمك ورقم هاتفك وتفاصيل الحجز، ليتمكّن الملعب من إدارة الحجز والتواصل معك بشأنه. قد تحتفظ الملاعب بسجلّها الخاص لك كعميل. لا نعطي الملاعب بريدك الإلكتروني.',
            'مزوّدو الخدمات الذين يساعدوننا في تشغيل PlayMaker: ‏Hetzner Online (الخوادم)، وGoogle Firebase (الإشعارات)، وGoogle وApple (إذا اخترت تسجيل الدخول عبرهما)، وOpenStreetMap (صور الخرائط).',
            'الجهات الرسمية، عندما يتطلّب القانون ذلك، أو عند الحاجة لحماية سلامة مستخدمينا وحقوقهم وحقوق PlayMaker.',
          ],
        },
        { p: 'لا نبيع بياناتك الشخصية ولا نؤجّرها لأي جهة.' },
      ],
    },
    {
      heading: 'أين تُخزَّن بياناتك',
      blocks: [
        {
          p: 'تستضيف شركة Hetzner Online خوادمنا خارج الأردن، وقد تعالج Google وApple البيانات في دول أخرى. نتعامل فقط مع مزوّدين يحمون البيانات وفق معايير معترف بها.',
        },
      ],
    },
    {
      heading: 'مدة الاحتفاظ بها',
      blocks: [
        {
          list: [
            'نحتفظ ببيانات حسابك طالما أن حسابك مفتوح.',
            'عند حذف حسابك، يُحذف اسمك وبريدك الإلكتروني ورقم هاتفك وصورتك وكلمة المرور فورًا، وتُحذف مفضلتك وإشعاراتك والأجهزة المسجّلة.',
            'تبقى سجلات الحجوزات والمدفوعات، بما فيها لقطات شاشة الدفع، دون اسمك أو بيانات التواصل معك، لأن الملاعب وPlayMaker تحتاجها لسجلاتها المالية ولحل النزاعات. ولا نحتفظ بها إلا للمدة اللازمة لذلك وبحسب ما يقتضيه القانون.',
            'قد يحتفظ الملعب بالاسم ورقم الهاتف الموجودين في قائمة عملائه الخاصة.',
            'تُحفظ سجلات الخوادم لفترة محدودة لأغراض الأمان.',
          ],
        },
        { p: 'اطّلع على طريقة حذف حسابك على playmakerjo.com/delete-account.' },
      ],
    },
    {
      heading: 'خياراتك',
      blocks: [
        {
          list: [
            'تعديل اسمك ورقم هاتفك وصورتك من التطبيق، في صفحة الملف الشخصي.',
            'حذف حسابك من التطبيق (الملف الشخصي ← حذف الحساب)، أو بطلب منّا — راجع playmakerjo.com/delete-account.',
            'إيقاف الإشعارات من التطبيق أو من إعدادات هاتفك، وإيقاف الوصول إلى الموقع من إعدادات هاتفك.',
            'طلب نسخة من بياناتك أو تصحيحها بمراسلتنا على support@playmakerjo.com.',
          ],
        },
      ],
    },
    {
      heading: 'الأمان',
      blocks: [
        {
          p: 'تنتقل البيانات عبر اتصالات مشفّرة (HTTPS). تُخزَّن كلمات المرور مشفّرة، ويحفظ التطبيق جلسة دخولك في التخزين الآمن على هاتفك، ولا يصل إلى البيانات الشخصية إلا من يحتاجها. لا يوجد نظام آمن بالكامل؛ وإذا تأثّرت بياناتك بأي اختراق فسنبلغك بحسب ما يقتضيه القانون.',
        },
      ],
    },
    {
      heading: 'الأطفال',
      blocks: [
        {
          p: 'تطبيق PlayMaker JO غير مخصّص للأطفال دون 13 عامًا، ولا نجمع بياناتهم عن قصد. إذا كنت تعتقد أن طفلًا قدّم لنا بيانات شخصية، فتواصل معنا وسنحذفها.',
        },
      ],
    },
    {
      heading: 'التغييرات على هذه السياسة',
      blocks: [
        {
          p: 'عند تغيير هذه السياسة نحدّث التاريخ في أعلاها، ونبلغك داخل التطبيق بالتغييرات المهمة.',
        },
      ],
    },
    {
      heading: 'تواصل معنا',
      blocks: [{ p: 'PlayMaker JO، عمّان، الأردن — support@playmakerjo.com' }],
    },
  ],
}

const deleteEn: LegalDoc = {
  title: 'Delete your account',
  updated: UPDATED.en,
  intro: [
    'You can delete your PlayMaker JO account whenever you like. Here is how, and what happens to your data.',
  ],
  sections: [
    {
      heading: 'Delete it in the app',
      blocks: [
        {
          steps: [
            'Open the PlayMaker JO app and sign in.',
            'Go to Profile.',
            'Tap Delete account.',
            'Enter your password and confirm. If you sign in with Google or Apple, leave the password empty.',
          ],
        },
        { p: 'Your account is deleted straight away.' },
      ],
    },
    {
      heading: 'Or ask us to delete it',
      blocks: [
        {
          p: 'If you can’t use the app, email us from the email address on your account and ask us to delete it. We may ask you to confirm the request, and we will reply once the account is deleted — within 30 days at most.',
        },
        { mailto: { label: 'Email support@playmakerjo.com', subject: 'Delete my account' } },
      ],
    },
    {
      heading: 'What is deleted',
      blocks: [
        {
          list: [
            'Your name, email address, phone number, profile photo and password.',
            'Your favourite venues, your notifications and the devices registered for notifications.',
            'Your upcoming bookings are cancelled, including weekly bookings. Money you paid is refunded or kept according to each venue’s cancellation rule — the same as if you cancelled yourself.',
          ],
        },
      ],
    },
    {
      heading: 'What is kept',
      blocks: [
        {
          list: [
            'Past booking and payment records, including payment screenshots, without your name or contact details. Venues and PlayMaker need them for their financial records and to resolve disputes, and keep them only as long as that and the law require.',
            'Reviews you wrote stay on the venue’s page, shown as "Deleted user".',
            'A venue you booked with may keep your name and phone number in its own customer list. You can ask that venue to remove them.',
          ],
        },
      ],
    },
    {
      heading: 'Venue owners and staff',
      blocks: [
        {
          p: 'Business accounts can’t be deleted in the app, because they hold a company’s bookings and billing. Email support@playmakerjo.com and we will close the account with you.',
        },
      ],
    },
  ],
}

const deleteAr: LegalDoc = {
  title: 'حذف حسابك',
  updated: UPDATED.ar,
  intro: ['يمكنك حذف حسابك في PlayMaker JO متى شئت. إليك الطريقة، وما يحدث لبياناتك.'],
  sections: [
    {
      heading: 'احذفه من التطبيق',
      blocks: [
        {
          steps: [
            'افتح تطبيق PlayMaker JO وسجّل الدخول.',
            'اذهب إلى الملف الشخصي.',
            'اضغط على حذف الحساب.',
            'أدخل كلمة المرور وأكّد. إذا كنت تسجّل الدخول عبر Google أو Apple، فاترك كلمة المرور فارغة.',
          ],
        },
        { p: 'يُحذف حسابك فورًا.' },
      ],
    },
    {
      heading: 'أو اطلب منّا حذفه',
      blocks: [
        {
          p: 'إذا لم تتمكّن من استخدام التطبيق، راسلنا من البريد الإلكتروني المسجّل في حسابك واطلب حذفه. قد نطلب منك تأكيد الطلب، وسنردّ عليك بعد حذف الحساب — خلال 30 يومًا كحدّ أقصى.',
        },
        { mailto: { label: 'راسل support@playmakerjo.com', subject: 'حذف حسابي' } },
      ],
    },
    {
      heading: 'ما يُحذف',
      blocks: [
        {
          list: [
            'اسمك وبريدك الإلكتروني ورقم هاتفك وصورة ملفك الشخصي وكلمة المرور.',
            'ملاعبك المفضلة وإشعاراتك والأجهزة المسجّلة لتلقّي الإشعارات.',
            'تُلغى حجوزاتك القادمة، بما فيها الحجوزات الأسبوعية، ويُعاد المبلغ الذي دفعته أو يحتفظ به الملعب بحسب سياسة الإلغاء في كل ملعب — تمامًا كما لو ألغيت بنفسك.',
          ],
        },
      ],
    },
    {
      heading: 'ما نحتفظ به',
      blocks: [
        {
          list: [
            'سجلات الحجوزات والمدفوعات السابقة، بما فيها لقطات شاشة الدفع، دون اسمك أو بيانات التواصل معك. تحتاجها الملاعب وPlayMaker لسجلاتها المالية ولحل النزاعات، ولا تُحفظ إلا للمدة التي يتطلّبها ذلك والقانون.',
            'تبقى التقييمات التي كتبتها على صفحة الملعب باسم "Deleted user" (مستخدم محذوف).',
            'قد يحتفظ ملعب حجزت لديه باسمك ورقم هاتفك في قائمة عملائه الخاصة، ويمكنك أن تطلب من ذلك الملعب حذفهما.',
          ],
        },
      ],
    },
    {
      heading: 'أصحاب الملاعب والموظفون',
      blocks: [
        {
          p: 'لا يمكن حذف حسابات الأعمال من التطبيق، لأنها تحتوي على حجوزات الشركة وفواتيرها. راسلنا على support@playmakerjo.com وسنغلق الحساب بالتنسيق معك.',
        },
      ],
    },
  ],
}

const termsEn: LegalDoc = {
  title: 'Terms of Service',
  updated: UPDATED.en,
  intro: [
    'These terms apply to the PlayMaker JO app, the venue dashboard and this website. Please read them before you use PlayMaker JO.',
  ],
  sections: [
    {
      heading: '1. Accepting these terms',
      blocks: [
        {
          p: 'By downloading, accessing or using PlayMaker JO, you agree to these Terms of Service. If you do not agree, do not use it. You must be at least 18 years old to create an account; if you are under 18, you may only use PlayMaker JO with the consent of a parent or guardian.',
        },
      ],
    },
    {
      heading: '2. Your account',
      blocks: [
        {
          p: 'Give accurate and complete information when you create your account. Keep your password private — you are responsible for everything done with your account. Each person may have one account. Tell us straight away if you think someone else is using your account.',
        },
      ],
    },
    {
      heading: '3. What PlayMaker JO is',
      blocks: [
        {
          p: 'PlayMaker JO is a marketplace that connects players with sports venues and helps them find and book a time. PlayMaker JO does not operate any venue listed on it. We do not own, manage or control the venues, and we are not responsible for their condition, safety or quality.',
        },
      ],
    },
    {
      heading: '4. Your responsibilities',
      blocks: [
        {
          p: 'As a player, you agree to arrive on time for your bookings, follow each venue’s rules, treat venue staff and other players with respect, and not make fraudulent bookings.',
        },
        {
          p: 'As a venue owner, you agree to keep your venue listings accurate and up to date, honour every confirmed booking, review payment proofs within a reasonable time (24 hours), and keep your venue safe and usable.',
        },
      ],
    },
    {
      heading: '5. Bookings and payment',
      blocks: [
        {
          list: [
            'A booking is confirmed once the venue accepts your payment. Today that means paying a deposit by CliQ: the app shows the venue’s CliQ alias and the amount, you transfer it from your bank and upload a screenshot, and the venue approves it.',
            'Each venue sets its own deposit (often 20%). The rest is paid at the venue on the day.',
            'An unpaid booking holds its time slot for a limited time — usually 2 hours, less when the game starts soon — and is then released automatically.',
            'Weekly bookings follow these terms for each session.',
          ],
        },
      ],
    },
    {
      heading: '6. Cancellations and refunds',
      blocks: [
        {
          list: [
            'Each venue sets a free-cancellation window (usually 24 hours). The app shows it, and exactly what will happen to your money, before you confirm a cancellation.',
            'Cancel at least that long before the game and everything you paid is refunded. Cancel later and the venue keeps what you paid. If you don’t show up, nothing is refunded.',
            'If the venue cancels your booking, your money is refunded — unless the venue cancelled at your request, in which case its cancellation rule applies.',
            'Refunds of CliQ payments are made by the venue to your bank account, normally within 3 business days.',
            'For a dispute about a booking or a refund, contact us within 48 hours at support@playmakerjo.com with your booking number. We will help between you and the venue and aim to resolve it within 5 business days.',
          ],
        },
      ],
    },
    {
      heading: '7. What you may not do',
      blocks: [
        {
          list: [
            'Repeatedly fail to show up for confirmed bookings.',
            'Upload fake or edited payment proofs.',
            'Use abusive, threatening or harassing language towards other users.',
            'Create more than one account, or fake accounts.',
            'Scrape, copy or redistribute content from PlayMaker JO.',
            'Try to bypass the platform to avoid fees.',
            'Use PlayMaker JO for anything illegal.',
          ],
        },
      ],
    },
    {
      heading: '8. Intellectual property',
      blocks: [
        {
          p: 'All content, design, logos and materials in PlayMaker JO belong to PlayMaker JO and are protected by intellectual property laws. You may not copy, modify, distribute or create derivative works from any part of it without our written permission.',
        },
      ],
    },
    {
      heading: '9. Limitation of liability',
      blocks: [
        { p: 'PlayMaker JO is not liable for:' },
        {
          list: [
            'The condition, safety or quality of any venue.',
            'Injuries or damage that happen at any venue.',
            'Disputes between players and venue owners.',
            'Personal belongings lost at venues.',
            'Service interruptions caused by technical problems beyond our control.',
          ],
        },
        {
          p: 'Our total liability will not exceed the fees you paid us in the 12 months before the claim.',
        },
      ],
    },
    {
      heading: '10. Governing law',
      blocks: [
        {
          p: 'These terms are governed by the laws of the Hashemite Kingdom of Jordan. Any dispute arising from them or from your use of PlayMaker JO is subject to the exclusive jurisdiction of the courts of Amman, Jordan.',
        },
      ],
    },
    {
      heading: '11. Changes',
      blocks: [
        {
          p: 'We may change these terms. We will tell you in the app about significant changes, and continuing to use PlayMaker JO after a change means you accept the new terms.',
        },
      ],
    },
    {
      heading: '12. Contact',
      blocks: [{ p: 'Questions about these terms: support@playmakerjo.com' }],
    },
  ],
}

const termsAr: LegalDoc = {
  title: 'شروط الخدمة',
  updated: UPDATED.ar,
  intro: [
    'تنطبق هذه الشروط على تطبيق PlayMaker JO ولوحة تحكم الملاعب وهذا الموقع. يرجى قراءتها قبل استخدام PlayMaker JO.',
  ],
  sections: [
    {
      heading: '1. قبول الشروط',
      blocks: [
        {
          p: 'بتحميلك PlayMaker JO أو وصولك إليه أو استخدامه، فإنك توافق على شروط الخدمة هذه. إذا كنت لا توافق، فلا تستخدمه. يجب أن يكون عمرك 18 عامًا على الأقل لإنشاء حساب، وإذا كان عمرك أقل من 18 عامًا فيمكنك استخدام PlayMaker JO بموافقة ولي الأمر فقط.',
        },
      ],
    },
    {
      heading: '2. حسابك',
      blocks: [
        {
          p: 'قدّم معلومات دقيقة وكاملة عند إنشاء حسابك. حافظ على سرية كلمة المرور، فأنت مسؤول عن كل ما يتم عبر حسابك. يُسمح لكل شخص بحساب واحد فقط. أبلغنا فورًا إذا اشتبهت في أن شخصًا آخر يستخدم حسابك.',
        },
      ],
    },
    {
      heading: '3. ما هو PlayMaker JO',
      blocks: [
        {
          p: 'PlayMaker JO منصة تربط اللاعبين بالملاعب الرياضية وتساعدهم على إيجاد موعد وحجزه. لا تشغّل PlayMaker JO أي ملعب مدرج عليها، ولا نملك الملاعب أو نديرها أو نتحكّم بها، ولسنا مسؤولين عن حالتها أو سلامتها أو جودتها.',
        },
      ],
    },
    {
      heading: '4. مسؤولياتك',
      blocks: [
        {
          p: 'كلاعب، توافق على الحضور في موعد حجوزاتك، واتباع قواعد كل ملعب، ومعاملة موظفي الملعب واللاعبين الآخرين باحترام، وعدم إجراء حجوزات احتيالية.',
        },
        {
          p: 'كصاحب ملعب، توافق على إبقاء معلومات ملاعبك دقيقة ومحدّثة، والالتزام بكل حجز مؤكّد، ومراجعة إثباتات الدفع خلال وقت معقول (24 ساعة)، والحفاظ على ملعبك آمنًا وصالحًا للاستخدام.',
        },
      ],
    },
    {
      heading: '5. الحجوزات والدفع',
      blocks: [
        {
          list: [
            'يُؤكَّد الحجز عندما يقبل الملعب دفعتك. يتم ذلك حاليًا بدفع العربون عبر كليك (CliQ): يعرض التطبيق اسم كليك الخاص بالملعب والمبلغ، فتحوّله من بنكك وترفع لقطة شاشة، ثم يوافق الملعب عليها.',
            'يحدّد كل ملعب قيمة العربون الخاصة به (غالبًا 20%)، ويُدفع الباقي في الملعب يوم المباراة.',
            'يبقى الموعد محجوزًا للحجز غير المدفوع لفترة محدودة — عادةً ساعتان، وأقل إذا كانت المباراة قريبة — ثم يُلغى تلقائيًا.',
            'تنطبق هذه الشروط على كل جلسة من جلسات الحجوزات الأسبوعية.',
          ],
        },
      ],
    },
    {
      heading: '6. الإلغاء والاسترداد',
      blocks: [
        {
          list: [
            'يحدّد كل ملعب مدة للإلغاء المجاني (عادةً 24 ساعة). يعرضها التطبيق، ويوضّح ما سيحدث للمبلغ بالضبط، قبل أن تؤكّد الإلغاء.',
            'إذا ألغيت قبل هذه المدة على الأقل يُعاد لك كل ما دفعته، وإذا ألغيت بعدها يحتفظ الملعب بما دفعته. وفي حال عدم الحضور لا يُسترَد أي مبلغ.',
            'إذا ألغى الملعب حجزك يُعاد لك المبلغ، إلا إذا ألغاه بطلب منك فتنطبق عندها سياسة الإلغاء الخاصة به.',
            'يُعيد الملعب مبالغ كليك المستردة إلى حسابك البنكي، عادةً خلال 3 أيام عمل.',
            'لأي نزاع حول حجز أو استرداد، تواصل معنا خلال 48 ساعة على support@playmakerjo.com مع رقم الحجز. سنساعد في حلّه بينك وبين الملعب، ونسعى لحلّه خلال 5 أيام عمل.',
          ],
        },
      ],
    },
    {
      heading: '7. ما لا يُسمح به',
      blocks: [
        {
          list: [
            'عدم الحضور للحجوزات المؤكّدة بشكل متكرر.',
            'رفع إثباتات دفع مزوّرة أو معدّلة.',
            'استخدام لغة مسيئة أو تهديدية أو مضايقة تجاه المستخدمين الآخرين.',
            'إنشاء أكثر من حساب، أو حسابات وهمية.',
            'نسخ محتوى PlayMaker JO أو إعادة توزيعه.',
            'محاولة تجاوز المنصة لتفادي الرسوم.',
            'استخدام PlayMaker JO لأي غرض غير قانوني.',
          ],
        },
      ],
    },
    {
      heading: '8. الملكية الفكرية',
      blocks: [
        {
          p: 'جميع المحتويات والتصاميم والشعارات والمواد في PlayMaker JO ملك لـ PlayMaker JO ومحمية بموجب قوانين الملكية الفكرية. لا يجوز نسخ أي جزء منها أو تعديله أو توزيعه أو إنشاء أعمال مشتقة منه دون إذن كتابي منّا.',
        },
      ],
    },
    {
      heading: '9. حدود المسؤولية',
      blocks: [
        { p: 'لا تتحمّل PlayMaker JO المسؤولية عن:' },
        {
          list: [
            'حالة أي ملعب أو سلامته أو جودته.',
            'الإصابات أو الأضرار التي تحدث في أي ملعب.',
            'النزاعات بين اللاعبين وأصحاب الملاعب.',
            'فقدان الممتلكات الشخصية في الملاعب.',
            'انقطاع الخدمة بسبب مشاكل تقنية خارجة عن سيطرتنا.',
          ],
        },
        {
          p: 'ولا تتجاوز مسؤوليتنا الإجمالية قيمة الرسوم التي دفعتها لنا خلال الـ 12 شهرًا السابقة للمطالبة.',
        },
      ],
    },
    {
      heading: '10. القانون الحاكم',
      blocks: [
        {
          p: 'تخضع هذه الشروط لقوانين المملكة الأردنية الهاشمية، ويخضع أي نزاع ينشأ عنها أو عن استخدامك لـ PlayMaker JO للاختصاص الحصري لمحاكم عمّان، الأردن.',
        },
      ],
    },
    {
      heading: '11. التعديلات',
      blocks: [
        {
          p: 'قد نعدّل هذه الشروط. سنبلغك داخل التطبيق بالتعديلات الجوهرية، ويُعدّ استمرارك في استخدام PlayMaker JO بعد التعديل قبولًا للشروط الجديدة.',
        },
      ],
    },
    {
      heading: '12. تواصل معنا',
      blocks: [{ p: 'لأي أسئلة حول هذه الشروط: support@playmakerjo.com' }],
    },
  ],
}

export const legalDocs: Record<LegalPageKey, Record<Lang, LegalDoc>> = {
  privacy: { en: privacyEn, ar: privacyAr },
  terms: { en: termsEn, ar: termsAr },
  deleteAccount: { en: deleteEn, ar: deleteAr },
}
