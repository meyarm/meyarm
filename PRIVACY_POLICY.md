# سياسة الخصوصية — معيار المعلم

**آخر تحديث: 3 يوليو 2026**

> النسخة العربية أدناه، تليها [English version](#privacy-policy--meyar-almoallem).

---

## مقدمة

تطبيق **معيار المعلم** هو تطبيق موجّه للمعلمين لإدارة الشعب والطلاب والحضور والواجبات والمشاركات والاختبارات وتصحيح أوراق OMR وإنشاء تقارير PDF والشهادات، مع دعم النسخ الاحتياطي والاشتراكات داخل التطبيق.

صُمّم التطبيق ليعمل **دون اتصال بالإنترنت (Offline-first)**، وتُخزَّن جميع بياناتك محلياً على جهازك عبر قاعدة بيانات SQLite. تشرح هذه السياسة أنواع البيانات التي يتعامل معها التطبيق وكيفية حمايتها.

---

## 1. البيانات التي تُخزَّن على جهازك

يتعامل التطبيق مع البيانات التالية، وتبقى **محلياً على جهاز المستخدم فقط**:

- أسماء الطلاب والشعب.
- سجلات الحضور.
- المشاركات الصفّية.
- درجات الاختبارات ونتائج تصحيح OMR.
- الواجبات.
- التقارير (PDF).
- الشهادات.
- إعدادات المستخدم (مثل اسم المعلم والجنس وأوقات الحصص).

**هذه البيانات لا تُرسَل إلى خوادمنا ولا تُرفع إلى أي جهة خارجية.** تبقى داخل جهازك ما لم تقم أنت بمشاركتها أو تصديرها بنفسك.

---

## 2. استخدام الإنترنت ومُعرّف الجهاز

يستخدم التطبيق الاتصال بالإنترنت في حالات محدودة فقط:

- **التحقق من أهلية الفترة التجريبية المجانية** عند أول تشغيل — لمنح تجربة واحدة لكل جهاز ومنع إعادة تفعيلها بتكرار التثبيت أو مسح البيانات.
- **تفعيل أكواد الاشتراك والتحقق من حالة الاشتراك.**
- **التواصل مع خدمة Supabase** للأغراض أعلاه فقط.

**مُعرّف الجهاز:** لتحقيق ما سبق، يُرسِل التطبيق **مُعرّف الجهاز فقط** إلى خادم Supabase:

- على Android: مُعرّف الجهاز (Android ID).
- على iOS: مُعرّف المورّد (identifierForVendor).

الغرض الوحيد من إرسال هذا المُعرّف هو **إدارة الفترة التجريبية (تجربة واحدة لكل جهاز) والتحقق من الاشتراكات والأكواد**. وهذا المُعرّف:

- **لا يرتبط باسمك أو هويتك الشخصية**، ولا يكشف اسم هاتفك أو رقمك أو موقعك الجغرافي.
- **لا يُستخدم للتتبّع أو الإعلانات أو التحليلات.**
- **لا يُباع ولا يُشارَك** مع أي طرف ثالث لأغراض تسويقية.
- يُحتفظ به فقط بالقدر اللازم لإدارة التجربة والاشتراك.

**لا يُستخدم الإنترنت لمزامنة أو رفع بيانات الطلاب** أو الدرجات أو الحضور أو التقارير — تبقى هذه البيانات محلياً على جهازك دائماً.

---

## 3. الأذونات المستخدمة

يطلب التطبيق الأذونات التالية فقط، ويُستخدم كل إذن للغرض الموضّح أمامه حصراً:

| الإذن | المنصّة | الغرض الفعلي |
| ----- | ------- | ------------ |
| الإنترنت (`INTERNET`) | Android | تفعيل أكواد الاشتراك والتحقق منها عبر Supabase فقط — لا لمزامنة بيانات الطلاب |
| الكاميرا (`CAMERA`) | Android / iOS | تصوير أوراق التظليل (OMR) لتصحيحها محلياً على الجهاز |
| قراءة الصور (`READ_MEDIA_IMAGES`) | Android 13+ | اختيار صورة ورقة تظليل من معرض الجهاز لتصحيحها |
| الوصول للتخزين (`WRITE_EXTERNAL_STORAGE`) | Android 12 وأقدم | حفظ ملفات PDF (التقارير والشهادات) وملفات النسخ الاحتياطية على الجهاز |
| مكتبة الصور (اختيار/حفظ) | iOS | اختيار صور أوراق التظليل من المعرض وحفظ نماذج الأسئلة |

- الكاميرا **غير إلزامية** لتشغيل التطبيق (`android:required="false"`)؛ يمكن استخدام معظم الميزات بدونها.
- **لا يُطلب أي إذن للموقع الجغرافي، أو جهات الاتصال، أو الميكروفون، أو أي بيانات حسّاسة أخرى.**

---

## 4. الكاميرا

يطلب التطبيق إذن الكاميرا **لغرض واحد فقط**: تصوير أوراق الإجابات (OMR) لتصحيحها محلياً على الجهاز.

- تُعالَج الصور محلياً.
- **لا تُرفع أي صورة إلى أي خادم.**

---

## 5. الصور والملفات

يتيح لك التطبيق:

- اختيار صورة من جهازك (لتصحيح OMR).
- حفظ ملفات PDF (تقارير وشهادات).
- تصدير النسخ الاحتياطية.
- استيراد النسخ الاحتياطية.

تبقى جميع هذه الملفات **داخل جهازك**، ولا تُنقل إلى خوادمنا إطلاقاً إلا إذا اخترت أنت مشاركتها عبر تطبيقات أخرى (مثل مشاركة ملف نسخة احتياطية لنفسك).

---

## 6. النسخ الاحتياطية

- تُنشأ النسخ الاحتياطية **محلياً على الجهاز**.
- تُحفظ في **المكان الذي يختاره المستخدم** (أو تتم مشاركتها عبر التطبيقات التي يختارها).
- **لا تُرفع النسخ الاحتياطية إلى خوادمنا** ولا إلى أي جهة خارجية.
- يتم التحقق من **سلامة النسخة الاحتياطية باستخدام بصمة SHA-256** قبل الاستعادة، لاكتشاف أي تلف أو تعديل.
- **المستخدم مسؤول** عن حفظ ملف النسخة الاحتياطية في مكان آمن، وعن أي مشاركة يقوم بها لهذا الملف.

---

## 7. مسؤولية بيانات الطلاب

- التطبيق **مخصص للمعلمين**، والمستخدم (المعلم) هو **المسؤول الوحيد** عن البيانات التي يقوم بإدخالها.
- تبقى بيانات الطلاب — مثل **الأسماء، الدرجات، الحضور، الواجبات، المشاركات، التقارير، والشهادات** — **محلياً على جهاز المستخدم**، ولا تُرسَل إلى خوادمنا.
- بما أن هذه البيانات لا تغادر الجهاز عبر التطبيق، فإن المستخدم مسؤول عن الالتزام بالأنظمة واللوائح المعمول بها في جهته أو بلده بشأن بيانات الطلاب.
- **لا نتحمّل مسؤولية** البيانات أو الملفات التي يختار المستخدم مشاركتها أو تصديرها بنفسه خارج التطبيق.

---

## 8. المدفوعات والاشتراكات

تُدار الاشتراكات داخل التطبيق عبر **Google Play Billing** على أندرويد، أو عبر **App Store (Apple)** على iOS، حسب المنصّة التي تستخدمها.

- تتم جميع عمليات الدفع بواسطة Google Play أو Apple، حسب المنصّة.
- **لا نقوم بجمع أو تخزين معلومات بطاقات الدفع.**
- تخضع معالجة الدفع لسياسة خصوصية وشروط Google Play أو Apple، حسب الحال.

---

## 9. الخدمات الخارجية

يعتمد التطبيق على الخدمات الخارجية التالية **فقط**:

| الخدمة | الغرض | البيانات المُرسَلة |
| ------ | ----- | ------------------ |
| Supabase | التحقق من أهلية الفترة التجريبية (تجربة واحدة لكل جهاز)، وتفعيل أكواد الاشتراك والتحقق من صلاحيتها | مُعرّف الجهاز فقط (وكود التفعيل عند إدخاله) |
| Google Play Billing | إدارة الاشتراكات وعمليات الدفع داخل التطبيق (أندرويد) | تُدار بواسطة Google |
| App Store (Apple) | إدارة الاشتراكات وعمليات الدفع داخل التطبيق (iOS) | تُدار بواسطة Apple |

**لا يستخدم التطبيق أي خدمات تتبّع أو تحليلات أو إعلانات.** (لا Firebase، ولا Google Analytics، ولا Crashlytics، ولا خدمات إعلانات، ولا ملفات تعريف ارتباط Cookies.)

---

## 10. الإشعارات

يستخدم التطبيق **إشعارات محلية فقط** (على الجهاز) لتذكيرك بمواعيد الحصص.

- لا تعتمد الإشعارات على أي خادم.
- **لا يستخدم التطبيق خدمة Firebase Cloud Messaging** أو أي خدمة إشعارات سحابية.

---

## 11. الأطفال

هذا التطبيق **موجَّه للمعلمين**، وليس موجَّهاً للأطفال للاستخدام المباشر. يقوم المعلم بإدخال وإدارة البيانات المتعلقة بعمله التعليمي على جهازه الخاص.

---

## 12. مشاركة البيانات

نلتزم بما يلي بوضوح:

- **لا نبيع** بياناتك أو بيانات طلابك.
- **لا نؤجّر** أي بيانات.
- **لا نشارك بيانات الطلاب** مع أي طرف ثالث لأغراض تسويقية أو غيرها.
- المُعرّف الوحيد الذي يغادر جهازك هو **مُعرّف الجهاز**، ويُرسَل إلى Supabase حصراً لإدارة الفترة التجريبية والاشتراك — وليس لأي غرض تسويقي، ولا يُباع.

البيانات التعليمية تبقى تحت سيطرتك الكاملة على جهازك.

---

## 13. حقوق المستخدم والتحكم في البيانات

بما أن بياناتك مخزّنة محلياً، فأنت تتحكم بها بالكامل:

- **حذف البيانات:** يمكنك حذف الطلاب أو الشعب أو أي سجلات من داخل التطبيق في أي وقت.
- **حذف النسخ الاحتياطية:** يمكنك حذف ملفات النسخ الاحتياطية التي أنشأتها من جهازك أو من أي مكان شاركتها فيه.
- **إزالة التطبيق:** عند إلغاء تثبيت التطبيق، تُحذف قاعدة البيانات المحلية وبياناتها من الجهاز.
- **إلغاء الاشتراك:** يمكنك إدارة أو إلغاء اشتراكك في أي وقت من خلال إعدادات الاشتراكات في **Google Play** أو **App Store**، حسب المنصّة التي تستخدمها.

---

## 14. أمان البيانات

- تُخزَّن البيانات محلياً على جهازك.
- يتم التحقق من سلامة ملفات النسخ الاحتياطية عبر بصمة SHA-256.
- نظراً لأن البيانات لا تغادر جهازك (إلا لأغراض التفعيل المذكورة في القسم 2)، فإن مسؤولية تأمين الجهاز نفسه تقع على المستخدم.

---

## 15. التعديلات على هذه السياسة

قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. عند إجراء تغييرات جوهرية، سنقوم بتحديث تاريخ "آخر تحديث" أعلى هذه الصفحة. يُنصح بمراجعة هذه الصفحة دورياً.

---

## 16. التواصل معنا

لأي استفسار بخصوص سياسة الخصوصية أو بياناتك، يمكنك التواصل عبر:

- **البريد الإلكتروني:** [meyarm.app@gmail.com](mailto:meyarm.app@gmail.com)

---
---

<a name="privacy-policy--meyar-almoallem"></a>

# Privacy Policy — Meyar Almoallem

**Last updated: July 3, 2026**

> The English version is below. See the [النسخة العربية](#سياسة-الخصوصية--معيار-المعلم) above.

---

## Introduction

**Meyar Almoallem** is an application designed for teachers to manage classes, students, attendance, homework, class participation, exams, OMR answer-sheet grading, PDF report generation, and certificates, with support for backups and in-app subscriptions.

The app is designed to be **offline-first**, and all your data is stored locally on your device using an SQLite database. This policy explains what data the app handles and how it is protected.

---

## 1. Data Stored on Your Device

The app handles the following data, which stays **locally on the user's device only**:

- Student and class names.
- Attendance records.
- Class participation.
- Exam grades and OMR grading results.
- Homework.
- Reports (PDF).
- Certificates.
- User settings (such as teacher name, gender, and class period times).

**This data is never sent to our servers or uploaded to any third party.** It remains on your device unless you choose to share or export it yourself.

---

## 2. Internet Usage and Device Identifier

The app uses an internet connection only in limited cases:

- **Verifying free-trial eligibility** on first launch — to grant one trial per device and prevent it from being re-activated by reinstalling or clearing app data.
- **Activating subscription codes and verifying subscription status.**
- **Communicating with the Supabase service** for the purposes above only.

**Device identifier:** To achieve the above, the app sends **only a device identifier** to the Supabase server:

- On Android: the device identifier (Android ID).
- On iOS: the vendor identifier (identifierForVendor).

The sole purpose of sending this identifier is to **manage the free trial (one trial per device) and verify subscriptions and codes**. This identifier:

- **Is not linked to your name or personal identity**, and does not reveal your phone's name, number, or geographic location.
- **Is not used for tracking, advertising, or analytics.**
- **Is not sold or shared** with any third party for marketing purposes.
- Is retained only as long as needed to manage the trial and subscription.

**The internet is not used to sync or upload student data**, grades, attendance, or reports — this data always stays locally on your device.

---

## 3. Permissions Used

The app requests only the following permissions, and each is used exclusively for the stated purpose:

| Permission | Platform | Actual Purpose |
| ---------- | -------- | -------------- |
| Internet (`INTERNET`) | Android | Activating and verifying subscriptions via Supabase only — never to sync student data |
| Camera (`CAMERA`) | Android / iOS | Photographing OMR answer sheets to grade them locally on the device |
| Read images (`READ_MEDIA_IMAGES`) | Android 13+ | Selecting an OMR answer-sheet image from the device gallery for grading |
| Storage access (`WRITE_EXTERNAL_STORAGE`) | Android 12 and older | Saving PDF files (reports and certificates) and backup files on the device |
| Photo library (pick/save) | iOS | Selecting OMR sheet images from the library and saving answer-sheet templates |

- The camera is **not required** to run the app (`android:required="false"`); most features work without it.
- **No permission is requested for location, contacts, microphone, or any other sensitive data.**

---

## 4. Camera

The app requests camera permission for **one purpose only**: to photograph answer sheets (OMR) for local grading on the device.

- Images are processed locally.
- **No image is uploaded to any server.**

---

## 5. Images and Files

The app allows you to:

- Pick an image from your device (for OMR grading).
- Save PDF files (reports and certificates).
- Export backups.
- Import backups.

All of these files remain **on your device** and are never transferred to our servers, unless you choose to share them through other apps (for example, sharing a backup file with yourself).

---

## 6. Backups

- Backups are created **locally on the device**.
- They are saved to a **location chosen by the user** (or shared through apps the user selects).
- **Backups are never uploaded to our servers** or to any third party.
- Backup **integrity is verified using a SHA-256 checksum** before restoring, to detect any corruption or tampering.
- The **user is responsible** for storing the backup file in a safe place and for any sharing of that file.

---

## 7. Responsibility for Student Data

- The app is **intended for teachers**, and the user (the teacher) is the **sole party responsible** for the data they enter.
- Student data — such as **names, grades, attendance, homework, class participation, reports, and certificates** — remains **locally on the user's device** and is not sent to our servers.
- Because this data does not leave the device through the app, the user is responsible for complying with the laws and regulations applicable in their institution or country regarding student data.
- **We are not responsible** for any data or files the user chooses to share or export themselves outside the app.

---

## 8. Payments and Subscriptions

In-app subscriptions are managed through **Google Play Billing** on Android, or through the **App Store (Apple)** on iOS, depending on your platform.

- All payments are processed by Google Play or Apple, depending on the platform.
- **We do not collect or store any payment card information.**
- Payment processing is subject to Google Play's or Apple's own privacy policy and terms, as applicable.

---

## 9. External Services

The app relies on the following external services **only**:

| Service | Purpose | Data Sent |
| ------- | ------- | --------- |
| Supabase | Verifying free-trial eligibility (one trial per device), and activating subscription codes and verifying their validity | Device identifier only (plus the activation code when entered) |
| Google Play Billing | Managing in-app subscriptions and payments (Android) | Handled by Google |
| App Store (Apple) | Managing in-app subscriptions and payments (iOS) | Handled by Apple |

**The app does not use any tracking, analytics, or advertising services.** (No Firebase, no Google Analytics, no Crashlytics, no advertising services, and no cookies.)

---

## 10. Notifications

The app uses **local notifications only** (on the device) to remind you of class times.

- Notifications do not rely on any server.
- **The app does not use Firebase Cloud Messaging** or any cloud notification service.

---

## 11. Children

This app is **intended for teachers**, not for direct use by children. The teacher enters and manages data related to their educational work on their own device.

---

## 12. Data Sharing

We are explicitly committed to the following:

- We **do not sell** your data or your students' data.
- We **do not rent** any data.
- We **do not share student data** with any third party for marketing or any other purpose.
- The only identifier that leaves your device is the **device identifier**, sent to Supabase solely to manage the free trial and subscription — not for any marketing purpose, and it is never sold.

Educational data remains fully under your control on your device.

---

## 13. User Rights and Data Control

Since your data is stored locally, you have full control over it:

- **Delete data:** You can delete students, classes, or any records from within the app at any time.
- **Delete backups:** You can delete backup files you created from your device or from anywhere you shared them.
- **Uninstall the app:** When you uninstall the app, the local database and its data are removed from the device.
- **Cancel subscription:** You can manage or cancel your subscription at any time through the subscription settings in **Google Play** or the **App Store**, depending on your platform.

---

## 14. Data Security

- Data is stored locally on your device.
- Backup file integrity is verified via a SHA-256 checksum.
- Because data does not leave your device (except for the activation purposes noted in Section 2), securing the device itself is the user's responsibility.

---

## 15. Changes to This Policy

We may update this privacy policy from time to time. When we make material changes, we will update the "Last updated" date at the top of this page. We recommend reviewing this page periodically.

---

## 16. Contact Us

For any questions regarding this privacy policy or your data, you can reach us via:

- **Email:** [meyarm.app@gmail.com](mailto:meyarm.app@gmail.com)
