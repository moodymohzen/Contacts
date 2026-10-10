import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcZ9O4p17JVr7C06k13bh2os0UNeAcsXc",
  authDomain: "contacts-fe6a3.firebaseapp.com",
  projectId: "contacts-fe6a3",
  storageBucket: "contacts-fe6a3.firebasestorage.app",
  messagingSenderId: "935301469100",
  appId: "1:935301469100:web:27cda42fe3e9b44cf3e009",
  measurementId: "G-511YL5PGVX"
};

const translations = {
  ar: {
    appName: "إدارة جهات الاتصال", controlPanel: "لوحة التحكم", mainMenu: "القائمة الرئيسية",
    contacts: "جهات الاتصال", users: "إدارة المستخدمين", userLoginPage: "واجهة المستخدمين", sidebarNote: "اللوحة مفتوحة للجميع ويمكنك الآن تعديل البيانات",
    contactsSubtitle: "كل الأشخاص المهمين في مكان واحد", usersSubtitle: "عرض المستخدمين المسجلين في قاعدة البيانات",
    refresh: "تحديث", addContact: "إضافة جهة اتصال", searchContacts: "ابحث بالاسم أو رقم الهاتف أو البريد...",
    searchUsers: "ابحث عن مستخدم بالاسم أو البريد...", allUsers: "كل المستخدمين",
    contactCount: "عدد جهات الاتصال", userCount: "عدد المستخدمين", newContact: "إضافة جهة اتصال",
    newContactHint: "أدخل بيانات جهة الاتصال الجديدة", name: "الاسم", phone: "رقم الهاتف",
    email: "البريد الإلكتروني", linkedUser: "المستخدم المرتبط", noUser: "بدون مستخدم",
    cancel: "إلغاء", save: "حفظ جهة الاتصال", loadingContacts: "جارٍ تحميل جهات الاتصال...",
    loadingUsers: "جارٍ تحميل المستخدمين...", noContacts: "لا توجد جهات اتصال تطابق بحثك.",
    noUsers: "لا يوجد مستخدمون لعرضهم.", noContactsYet: "لا توجد جهات اتصال حتى الآن. أضف أول جهة اتصال.",
    noUsersYet: "لم يتم العثور على مستخدمين في مجموعة users.", loadError: "تعذر تحميل البيانات.",
    permissionHint: "تحقق من اتصال الإنترنت وقواعد أمان Firestore التي تسمح بالقراءة.",
    saveError: "تعذر حفظ جهة الاتصال. تحقق من اتصال الإنترنت وقواعد الكتابة في Firestore.",
    saving: "جارٍ الحفظ...", save: "حفظ جهة الاتصال", nameRequired: "يرجى إدخال اسم جهة الاتصال.",
    linkedTo: "المستخدم المرتبط", created: "تاريخ الإنشاء", user: "المستخدم",
    noEmail: "لا يوجد بريد إلكتروني", noPhone: "لا يوجد رقم هاتف", unknown: "غير محدد",
    loadContactsFailed: "تعذر تحميل جهات الاتصال", loadUsersFailed: "تعذر تحميل المستخدمين",
    contactsView: "contacts", usersView: "users", languageButton: "English",
    navigationLabel: "التنقل الرئيسي", searchLabel: "البحث والتصفية", close: "إغلاق",
    callContact: "اتصال", whatsappContact: "مراسلة عبر واتساب", saveToPhone: "حفظ على الهاتف",
    contactSaveFailed: "تعذر حفظ جهة الاتصال على الهاتف.",
    exportAll: "حفظ كل جهات الاتصال بصيغة VCF",
    exportContactsFailed: "تعذر تصدير جهات الاتصال.",
    addUser: "إضافة مستخدم", editUser: "تعديل المستخدم", userFormHint: "أدخل الاسم وكلمة المرور والبريد الإلكتروني والنوع",
    userName: "الاسم", password: "كلمة المرور", userType: "النوع", saveUser: "حفظ المستخدم",
    saveUserFailed: "تعذر حفظ المستخدم. تحقق من صلاحيات Firestore.",
    userNameRequired: "يرجى إدخال اسم المستخدم.",
    chooseUserType: "اختر النوع", managerRole: "مدير", supervisorRole: "مشرف",
    standardUserRole: "مستخدم", showPassword: "إظهار كلمة المرور", hidePassword: "إخفاء كلمة المرور",
    backToUsers: "العودة للمستخدمين", userDetails: "بيانات المستخدم",
    userContacts: "جهات اتصال المستخدم", noUserContacts: "لا توجد جهات اتصال مرتبطة بهذا المستخدم.",
    passwordField: "كلمة المرور", emptyValue: "بدون قيمة", openUserDetails: "فتح صفحة المستخدم"
  },
  en: {
    appName: "Contact Manager", controlPanel: "Admin dashboard", mainMenu: "MAIN MENU",
    contacts: "Contacts", users: "Manage users", userLoginPage: "User portal", sidebarNote: "This dashboard is open to everyone. You can manage your data.",
    contactsSubtitle: "All the people who matter, in one place", usersSubtitle: "Users registered in your database",
    refresh: "Refresh", addContact: "Add contact", searchContacts: "Search by name, phone, or email...",
    searchUsers: "Search users by name or email...", allUsers: "All users",
    contactCount: "contacts", userCount: "users", newContact: "Add a contact",
    newContactHint: "Enter the new contact's details", name: "Name", phone: "Phone number",
    email: "Email address", linkedUser: "Linked user", noUser: "No user",
    cancel: "Cancel", save: "Save contact", loadingContacts: "Loading contacts...",
    loadingUsers: "Loading users...", noContacts: "No contacts match your search.",
    noUsers: "There are no users to display.", noContactsYet: "No contacts yet. Add your first contact.",
    noUsersYet: "No users were found in the users collection.", loadError: "Unable to load data.",
    permissionHint: "Check your internet connection and Firestore rules to allow read access.",
    saveError: "Unable to save the contact. Check your internet connection and Firestore write rules.",
    saving: "Saving...", nameRequired: "Please enter a contact name.",
    linkedTo: "Linked user", created: "Created", user: "User",
    noEmail: "No email address", noPhone: "No phone number", unknown: "Unknown",
    loadContactsFailed: "Unable to load contacts", loadUsersFailed: "Unable to load users",
    contactsView: "contacts", usersView: "users", languageButton: "العربية",
    navigationLabel: "Main navigation", searchLabel: "Search and filter", close: "Close",
    callContact: "Call", whatsappContact: "Message on WhatsApp", saveToPhone: "Save to phone",
    contactSaveFailed: "Unable to save this contact to your phone.",
    exportAll: "Export all contacts as VCF",
    exportContactsFailed: "Unable to export contacts.",
    addUser: "Add user", editUser: "Edit user", userFormHint: "Enter the name, password, email, and type",
    userName: "Name", password: "Password", userType: "Type", saveUser: "Save user",
    saveUserFailed: "Unable to save user. Check Firestore permissions.",
    userNameRequired: "Please enter a user name.",
    chooseUserType: "Select a type", managerRole: "Manager", supervisorRole: "Supervisor",
    standardUserRole: "User", showPassword: "Show password", hidePassword: "Hide password",
    backToUsers: "Back to users", userDetails: "User details",
    userContacts: "User contacts", noUserContacts: "No contacts are linked to this user.",
    passwordField: "Password", emptyValue: "No value", openUserDetails: "Open user page"
  }
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "contactsid");
const state = {
  contacts: [],
  users: [],
  view: "contacts",
  language: "ar",
  selectedUserId: null,
  revealDetailPassword: false,
  loading: { contacts: true, users: true },
  errors: {}
};

const elements = {
  records: document.querySelector("#records"),
  status: document.querySelector("#statusMessage"),
  search: document.querySelector("#searchInput"),
  filter: document.querySelector("#userFilter"),
  count: document.querySelector("#recordCount"),
  countLabel: document.querySelector("#countLabel"),
  title: document.querySelector("#pageTitle"),
  subtitle: document.querySelector("#pageSubtitle"),
  addButton: document.querySelector("#addButton"),
  addUserButton: document.querySelector("#addUserButton"),
  backToUsersButton: document.querySelector("#backToUsersButton"),
  exportAllButton: document.querySelector("#exportAllButton"),
  languageButton: document.querySelector("#languageButton"),
  topbarTitle: document.querySelector("#topbarTitle"),
  mainNavigation: document.querySelector("#mainNavigation"),
  searchToolbar: document.querySelector("#searchToolbar"),
  dialog: document.querySelector("#contactDialog"),
  form: document.querySelector("#contactForm"),
  formError: document.querySelector("#formError"),
  saveButton: document.querySelector("#saveContactButton"),
  contactUserSelect: document.querySelector("#contactUserSelect"),
  userDialog: document.querySelector("#userDialog"),
  userForm: document.querySelector("#userForm"),
  userDialogTitle: document.querySelector("#userDialogTitle"),
  userFormError: document.querySelector("#userFormError"),
  saveUserButton: document.querySelector("#saveUserButton"),
  userNameInput: document.querySelector("#userNameInput"),
  userPasswordInput: document.querySelector("#userPasswordInput"),
  userEmailInput: document.querySelector("#userEmailInput"),
  userTypeInput: document.querySelector("#userTypeInput"),
  toggleUserPassword: document.querySelector("#toggleUserPassword")
};
let editingUser = null;

function text(key) {
  return translations[state.language][key] ?? key;
}

function setLanguage(language) {
  state.language = language;
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (key) element.textContent = text(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (key) element.setAttribute("placeholder", text(key));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    if (key) element.setAttribute("aria-label", text(key));
  });
  elements.languageButton.textContent = text("languageButton");
  elements.exportAllButton.title = text("exportAll");
  setPasswordVisibility(elements.userPasswordInput.type === "text");
  elements.mainNavigation.setAttribute("aria-label", text("navigationLabel"));
  elements.searchToolbar.setAttribute("aria-label", text("searchLabel"));
  updateUserOptions();
  render();
}

function pick(record, keys) {
  if (!record || typeof record !== "object") return "";
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return "";
}

function recordName(record) {
  return pick(record, ["name", "fullName", "displayName", "username", "userName", "firstName"]) || text("unknown");
}

function userLabel(record) {
  return recordName(record);
}

function associatedUserName(contact) {
  const id = pick(contact, ["userId", "ownerId", "createdBy"]);
  const user = state.users.find((candidate) => candidate.id === id);
  return user ? userLabel(user.data) : pick(contact, ["userName", "ownerName"]);
}

function icon(path, viewBox = "0 0 24 24") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("aria-hidden", "true");
  const shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
  shape.setAttribute("d", path);
  svg.append(shape);
  return svg;
}

function addDetail(container, path, value, hrefPrefix) {
  if (!value) return;
  const row = document.createElement("div");
  row.className = "record-detail";
  row.append(icon(path));
  if (hrefPrefix) {
    const link = document.createElement("a");
    link.href = `${hrefPrefix}${value}`;
    link.textContent = value;
    row.append(link);
  } else {
    const span = document.createElement("span");
    span.textContent = value;
    row.append(span);
  }
  container.append(row);
}

function makeContactActions(record) {
  const actions = document.createElement("div");
  actions.className = "record-actions";
  const phone = pick(record, ["phone", "phoneNumber", "mobile", "telephone"]);

  if (phone) {
    const callLink = document.createElement("a");
    callLink.className = "contact-action call-action";
    callLink.href = `tel:${phone.replace(/[^\d+*#,;]/g, "")}`;
    callLink.setAttribute("aria-label", text("callContact"));
    callLink.title = text("callContact");
    callLink.append(icon("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.73 2.03Z"));
    actions.append(callLink);

    const whatsappNumber = phone.replace(/\D/g, "").replace(/^00/, "");
    if (whatsappNumber) {
      const whatsappLink = document.createElement("a");
      whatsappLink.className = "contact-action whatsapp-action";
      whatsappLink.href = `https://wa.me/${whatsappNumber}`;
      whatsappLink.target = "_blank";
      whatsappLink.rel = "noopener noreferrer";
      whatsappLink.setAttribute("aria-label", text("whatsappContact"));
      whatsappLink.title = text("whatsappContact");
      whatsappLink.append(icon("M20.5 11.5a8.5 8.5 0 0 1-12.58 7.42L3 20l1.17-4.7A8.5 8.5 0 1 1 20.5 11.5Z M8.5 8.5c.4 2.4 2.6 4.6 5 5l1-1 2 1-.5 2c-4.5.5-8.5-3.5-8-8l2-.5 1 2-1.5.5Z"));
      actions.append(whatsappLink);
    }
  }

  const saveButton = document.createElement("button");
  saveButton.className = "contact-action save-action";
  saveButton.type = "button";
  saveButton.setAttribute("aria-label", text("saveToPhone"));
  saveButton.title = text("saveToPhone");
  saveButton.append(icon("M12 3v12M7 10l5 5 5-5M5 21h14"));
  saveButton.addEventListener("click", () => saveContactToPhone(record));
  actions.append(saveButton);
  return actions;
}

function escapeVCard(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\r\n?|\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function makeVCard(record) {
  const name = recordName(record);
  const phone = pick(record, ["phone", "phoneNumber", "mobile", "telephone"]);
  const lines = ["BEGIN:VCARD", "VERSION:3.0", `FN:${escapeVCard(name)}`, `N:${escapeVCard(name)};;;;`];
  if (phone) lines.push(`TEL;TYPE=CELL:${escapeVCard(phone)}`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

function makeVCardFile(records, fileName) {
  const cards = records.map(makeVCard).join("\r\n");
  return new File(["\uFEFF", cards, "\r\n"], fileName, { type: "text/vcard;charset=utf-8" });
}

async function shareOrDownloadVCard(file, title) {
  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title });
    return;
  }
  downloadVCard(file);
}

function downloadVCard(file) {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function saveContactToPhone(record) {
  const name = recordName(record);
  const fileName = `${name.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_") || "contact"}.vcf`;
  const file = makeVCardFile([record], fileName);
  try {
    await shareOrDownloadVCard(file, name);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    console.error(text("contactSaveFailed"), error);
    elements.status.textContent = `${text("contactSaveFailed")} (${error.message})`;
    elements.status.hidden = false;
  }
}

async function exportAllContacts() {
  const contacts = state.contacts.map(({ data }) => data);
  if (!contacts.length) return;

  const file = makeVCardFile(contacts, "contacts.vcf");
  try {
    downloadVCard(file);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    console.error(text("exportContactsFailed"), error);
    elements.status.textContent = `${text("exportContactsFailed")} (${error.message})`;
    elements.status.hidden = false;
  }
}

const userFieldDefinitions = {
  name: { aliases: ["username", "name", "fullname", "displayname", "firstname"], defaultKey: "username" },
  password: { aliases: ["password"], defaultKey: "password" },
  email: { aliases: ["email", "mail"], defaultKey: "Email" },
  type: { aliases: ["type", "role", "usertype"], defaultKey: "Type" }
};

function findUserFieldKey(userData, field) {
  const definition = userFieldDefinitions[field];
  return Object.keys(userData).find((key) => definition.aliases.includes(key.toLocaleLowerCase())) || definition.defaultKey;
}

function getUserField(userData, field) {
  const key = findUserFieldKey(userData, field);
  return userData[key] == null ? "" : String(userData[key]);
}

function openUserEditor(user = null) {
  editingUser = user;
  const data = user?.data ?? {};
  elements.userForm.reset();
  elements.userFormError.hidden = true;
  elements.userDialogTitle.textContent = text(user ? "editUser" : "addUser");
  elements.userNameInput.value = user ? getUserField(data, "name") : "";
  elements.userPasswordInput.value = user ? getUserField(data, "password") : "";
  setPasswordVisibility(false);
  elements.userEmailInput.value = user ? getUserField(data, "email") : "";
  const currentType = user ? getUserField(data, "type") : "user";
  if (currentType && !Array.from(elements.userTypeInput.options).some((option) => option.value === currentType)) {
    const existingTypeOption = document.createElement("option");
    existingTypeOption.value = currentType;
    existingTypeOption.textContent = currentType;
    elements.userTypeInput.append(existingTypeOption);
  }
  elements.userTypeInput.value = currentType;
  elements.userDialog.showModal();
}

function setPasswordVisibility(visible) {
  elements.userPasswordInput.type = visible ? "text" : "password";
  const label = text(visible ? "hidePassword" : "showPassword");
  elements.toggleUserPassword.setAttribute("aria-label", label);
  elements.toggleUserPassword.title = label;
  elements.toggleUserPassword.replaceChildren(icon(visible
    ? "M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a16 16 0 0 1-3.1 3.9M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1 0 2-.2 2.9-.5"
    : "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"));
}

function makeCard(record, type, recordId) {
  const card = document.createElement("article");
  card.className = "record-card";
  const top = document.createElement("div");
  top.className = "record-top";
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = recordName(record).slice(0, 1).toLocaleUpperCase();
  const identity = document.createElement("div");
  identity.style.minWidth = "0";
  const heading = document.createElement("h2");
  heading.className = "record-name";
  heading.textContent = recordName(record);
  identity.append(heading);
  const subtitle = type === "users" ? getUserField(record, "type") : "";
  if (subtitle) {
    const sub = document.createElement("div");
    sub.className = "record-subtitle";
    sub.textContent = subtitle;
    identity.append(sub);
  }
  top.append(avatar, identity);
  if (type === "contacts") top.append(makeContactActions(record));
  if (type === "users") {
    const detailsButton = document.createElement("button");
    detailsButton.className = "contact-action user-details-action";
    detailsButton.type = "button";
    detailsButton.setAttribute("aria-label", text("openUserDetails"));
    detailsButton.title = text("openUserDetails");
    detailsButton.append(icon("M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"));
    detailsButton.addEventListener("click", () => {
      state.selectedUserId = recordId;
      state.view = "userDetail";
      state.revealDetailPassword = false;
      render();
    });
    top.append(detailsButton);

    const editButton = document.createElement("button");
    editButton.className = "contact-action edit-user-action";
    editButton.type = "button";
    editButton.setAttribute("aria-label", text("editUser"));
    editButton.title = text("editUser");
    editButton.append(icon("M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"));
    editButton.addEventListener("click", () => openUserEditor({ id: recordId, data: record }));
    top.append(editButton);
  }
  card.append(top);

  const details = document.createElement("div");
  details.className = "record-details";
  if (type === "users") addDetail(details, "M4 4h16v16H4z M4 7l8 6 8-6", getUserField(record, "email"), "mailto:");
  addDetail(details, "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.73 2.03Z", pick(record, ["phone", "phoneNumber", "mobile", "telephone"]), "tel:");
  if (type === "contacts") {
    const linkedUser = associatedUserName(record);
    addDetail(details, "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8", linkedUser ? `${text("linkedTo")}: ${linkedUser}` : "");
  } else {
    const createdAt = record.createdAt ?? record.created_at;
    addDetail(details, "M3 4h18v16H3z M7 8h10M7 12h10M7 16h6", createdAt ? `${text("created")}: ${formatDate(createdAt)}` : "");
  }
  if (details.childElementCount) card.append(details);
  return card;
}

function normalizeIdentity(value) {
  return typeof value === "string" || typeof value === "number" ? String(value).trim().toLocaleLowerCase() : "";
}

function userIdentities(user) {
  return new Set([
    user.id,
    ...Object.entries(user.data)
      .filter(([key]) => ["userid", "uid", "username", "user", "email", "mail"].includes(key.toLocaleLowerCase()))
      .map(([, value]) => normalizeIdentity(value))
  ].map(normalizeIdentity).filter(Boolean));
}

function contactsForUser(user) {
  const identities = userIdentities(user);
  return state.contacts.filter(({ data }) => {
    const contactIdentityValues = Object.entries(data)
      .filter(([key]) => ["userid", "uid", "username", "user", "ownerid", "ownername", "createdby", "createdbyname", "useremail", "owneremail", "usermail"].includes(key.toLocaleLowerCase()))
      .map(([, value]) => normalizeIdentity(value))
      .filter(Boolean);
    return contactIdentityValues.some((identity) => identities.has(identity));
  });
}

function displayUserValue(value) {
  if (value == null || value === "") return text("emptyValue");
  if (value && typeof value.toDate === "function") return formatDate(value);
  if (value instanceof Date) return formatDate(value);
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function renderUserDetail() {
  const user = state.users.find(({ id }) => id === state.selectedUserId);
  elements.title.textContent = user ? userLabel(user.data) : text("userDetails");
  elements.topbarTitle.textContent = text("userDetails");
  elements.subtitle.textContent = text("userDetails");
  elements.countLabel.textContent = text("contactCount");
  elements.addButton.hidden = true;
  elements.addUserButton.hidden = true;
  elements.exportAllButton.hidden = true;
  elements.backToUsersButton.hidden = false;
  elements.filter.hidden = true;
  elements.searchToolbar.hidden = true;
  elements.records.replaceChildren();

  if (!user) {
    elements.status.textContent = state.loading.users ? text("loadingUsers") : text("noUsers");
    elements.status.hidden = false;
    elements.count.textContent = "0";
    return;
  }

  elements.status.hidden = true;
  const userContacts = contactsForUser(user);
  elements.count.textContent = String(userContacts.length);

  const detailsCard = document.createElement("section");
  detailsCard.className = "user-detail-panel";
  const detailsHeading = document.createElement("h2");
  detailsHeading.className = "user-detail-heading";
  detailsHeading.textContent = text("userDetails");
  detailsCard.append(detailsHeading);

  const detailsList = document.createElement("dl");
  detailsList.className = "user-detail-list";
  for (const [key, value] of Object.entries(user.data)) {
    if (["userid", "uid"].includes(key.toLocaleLowerCase())) continue;
    const row = document.createElement("div");
    row.className = "user-detail-row";
    const label = document.createElement("dt");
    label.textContent = /password|secret|token/i.test(key) ? text("passwordField") : key;
    const valueContainer = document.createElement("dd");
    if (/password|secret|token/i.test(key) && value) {
      const passwordText = document.createElement("span");
      passwordText.textContent = state.revealDetailPassword ? displayUserValue(value) : "••••••••";
      const toggle = document.createElement("button");
      toggle.className = "password-toggle detail-password-toggle";
      toggle.type = "button";
      const toggleLabel = text(state.revealDetailPassword ? "hidePassword" : "showPassword");
      toggle.setAttribute("aria-label", toggleLabel);
      toggle.title = toggleLabel;
      toggle.append(icon(state.revealDetailPassword
        ? "M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a16 16 0 0 1-3.1 3.9M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7c1 0 2-.2 2.9-.5"
        : "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"));
      toggle.addEventListener("click", () => {
        state.revealDetailPassword = !state.revealDetailPassword;
        renderUserDetail();
      });
      valueContainer.append(passwordText, toggle);
    } else {
      const valueText = document.createElement("span");
      valueText.textContent = displayUserValue(value);
      if (value && typeof value === "object" && typeof value.toDate !== "function" && !(value instanceof Date)) {
        valueText.className = "user-detail-json";
      }
      valueContainer.append(valueText);
    }
    row.append(label, valueContainer);
    detailsList.append(row);
  }
  detailsCard.append(detailsList);
  elements.records.append(detailsCard);

  const contactsHeading = document.createElement("h2");
  contactsHeading.className = "related-contacts-heading";
  contactsHeading.textContent = `${text("userContacts")} (${userContacts.length})`;
  elements.records.append(contactsHeading);
  if (!userContacts.length) {
    elements.records.append(emptyState(text("noUserContacts")));
  } else {
    for (const contact of userContacts) {
      elements.records.append(makeCard(contact.data, "contacts", contact.id));
    }
  }
}

function formatDate(value) {
  const date = value?.toDate ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(state.language === "ar" ? "ar" : "en", { dateStyle: "medium" }).format(date);
}

function updateUserOptions() {
  const selected = elements.filter.value;
  const options = [[ "", text("allUsers") ], ...state.users.map((user) => [user.id, userLabel(user.data)])];
  elements.filter.replaceChildren();
  elements.contactUserSelect.replaceChildren();
  const noUserOption = document.createElement("option");
  noUserOption.value = "";
  noUserOption.textContent = text("noUser");
  elements.contactUserSelect.append(noUserOption);
  for (const [id, label] of options) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = label;
    elements.filter.append(option);
    if (id) {
      const contactOption = option.cloneNode(true);
      elements.contactUserSelect.append(contactOption);
    }
  }
  elements.filter.value = options.some(([id]) => id === selected) ? selected : "";
}

function render() {
  if (state.view === "userDetail") {
    renderUserDetail();
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.view === "users");
    });
    return;
  }

  const isContacts = state.view === "contacts";
  const data = isContacts ? state.contacts : state.users;
  const query = elements.search.value.trim().toLocaleLowerCase();
  const filtered = data.filter(({ data: record }) => {
    const searchable = [
      recordName(record),
      isContacts ? "" : getUserField(record, "email"),
      pick(record, ["phone", "phoneNumber", "mobile", "telephone"]),
      isContacts ? pick(record, ["role", "userType", "type"]) : getUserField(record, "type")
    ].join(" ").toLocaleLowerCase();
    const matchesQuery = searchable.includes(query);
    const matchesUser = !isContacts || !elements.filter.value || pick(record, ["userId", "ownerId", "createdBy"]) === elements.filter.value;
    return matchesQuery && matchesUser;
  });

  elements.title.textContent = text(isContacts ? "contacts" : "users");
  elements.topbarTitle.textContent = text(isContacts ? "contacts" : "users");
  elements.subtitle.textContent = text(isContacts ? "contactsSubtitle" : "usersSubtitle");
  elements.countLabel.textContent = text(isContacts ? "contactCount" : "userCount");
  elements.addButton.hidden = !isContacts;
  elements.addUserButton.hidden = isContacts;
  elements.backToUsersButton.hidden = true;
  elements.exportAllButton.hidden = !isContacts;
  elements.exportAllButton.disabled = state.loading.contacts || state.contacts.length === 0;
  elements.filter.hidden = !isContacts;
  elements.searchToolbar.hidden = false;
  elements.search.placeholder = text(isContacts ? "searchContacts" : "searchUsers");
  elements.count.textContent = String(filtered.length);
  elements.records.replaceChildren();
  const error = state.errors[state.view];
  elements.status.textContent = error || "";
  elements.status.hidden = !error;

  if (state.loading[state.view]) {
    elements.records.append(emptyState(text(isContacts ? "loadingContacts" : "loadingUsers")));
    return;
  }
  if (!filtered.length) {
    const noRecords = data.length ? text(isContacts ? "noContacts" : "noUsers") : text(isContacts ? "noContactsYet" : "noUsersYet");
    elements.records.append(emptyState(noRecords));
    return;
  }
  for (const item of filtered) elements.records.append(makeCard(item.data, state.view, item.id));
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.view === state.view);
  });
}

function emptyState(message) {
  const empty = document.createElement("div");
  empty.className = "empty-state";
  empty.textContent = message;
  return empty;
}

function showLoadError(collectionName, error) {
  console.error(text(collectionName === "contacts" ? "loadContactsFailed" : "loadUsersFailed"), error);
  state.errors[collectionName] = `${text("loadError")} ${text("permissionHint")} (${error.code || error.message})`;
  state.loading[collectionName] = false;
  render();
}

onSnapshot(collection(db, "contacts"), (snapshot) => {
  state.contacts = snapshot.docs.map((document) => ({ id: document.id, data: document.data() }));
  state.loading.contacts = false;
  delete state.errors.contacts;
  updateUserOptions();
  render();
}, (error) => showLoadError("contacts", error));

onSnapshot(collection(db, "users"), (snapshot) => {
  state.users = snapshot.docs.map((document) => ({ id: document.id, data: document.data() }));
  state.loading.users = false;
  delete state.errors.users;
  updateUserOptions();
  render();
}, (error) => showLoadError("users", error));

document.querySelectorAll(".nav-link").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    state.selectedUserId = null;
    state.revealDetailPassword = false;
    document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link === button));
    render();
  });
});
elements.backToUsersButton.addEventListener("click", () => {
  state.view = "users";
  state.selectedUserId = null;
  state.revealDetailPassword = false;
  render();
});

elements.search.addEventListener("input", render);
elements.filter.addEventListener("change", render);
elements.languageButton.addEventListener("click", () => setLanguage(state.language === "ar" ? "en" : "ar"));
document.querySelector("#refreshButton").addEventListener("click", async () => {
  state.loading.contacts = true;
  state.loading.users = true;
  render();
  const results = await Promise.allSettled([
    getDocs(collection(db, "contacts")),
    getDocs(collection(db, "users"))
  ]);
  results.forEach((result, index) => {
    const collectionName = index === 0 ? "contacts" : "users";
    if (result.status === "fulfilled") {
      state[collectionName] = result.value.docs.map((document) => ({ id: document.id, data: document.data() }));
      state.loading[collectionName] = false;
      delete state.errors[collectionName];
    } else {
      showLoadError(collectionName, result.reason);
    }
  });
  updateUserOptions();
  render();
});
elements.addButton.addEventListener("click", () => {
  elements.form.reset();
  elements.formError.hidden = true;
  elements.dialog.showModal();
});
elements.exportAllButton.addEventListener("click", exportAllContacts);
elements.addUserButton.addEventListener("click", () => openUserEditor());
elements.toggleUserPassword.addEventListener("click", () => {
  setPasswordVisibility(elements.userPasswordInput.type !== "text");
});
document.querySelector("#closeUserDialogButton").addEventListener("click", () => elements.userDialog.close());
document.querySelector("#cancelUserDialogButton").addEventListener("click", () => elements.userDialog.close());
elements.userDialog.addEventListener("click", (event) => {
  if (event.target === elements.userDialog) elements.userDialog.close();
});
document.querySelector("#closeDialogButton").addEventListener("click", () => elements.dialog.close());
document.querySelector("#cancelDialogButton").addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("click", (event) => {
  if (event.target === elements.dialog) elements.dialog.close();
});

elements.userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  elements.userFormError.hidden = true;
  const values = {
    name: elements.userNameInput.value.trim(),
    password: elements.userPasswordInput.value,
    email: elements.userEmailInput.value.trim(),
    type: elements.userTypeInput.value.trim()
  };

  elements.saveUserButton.disabled = true;
  elements.saveUserButton.textContent = text("saving");
  try {
    if (editingUser) {
      const updates = {};
      for (const [field, value] of Object.entries(values)) {
        updates[findUserFieldKey(editingUser.data, field)] = value;
      }
      await updateDoc(doc(db, "users", editingUser.id), updates);
    } else {
      await addDoc(collection(db, "users"), {
        username: values.name,
        password: values.password,
        Email: values.email,
        Type: values.type
      });
    }
    elements.userDialog.close();
  } catch (error) {
    console.error(text("saveUserFailed"), error);
    elements.userFormError.textContent = `${text("saveUserFailed")} (${error.code || error.message})`;
    elements.userFormError.hidden = false;
  } finally {
    elements.saveUserButton.disabled = false;
    elements.saveUserButton.textContent = text("saveUser");
  }
});

elements.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(elements.form);
  const name = String(formData.get("name") || "").trim();
  if (!name) {
    elements.formError.textContent = text("nameRequired");
    elements.formError.hidden = false;
    return;
  }
  const contact = {
    name,
    phone: String(formData.get("phone") || "").trim(),
    createdAt: serverTimestamp()
  };
  const userId = String(formData.get("userId") || "");
  if (userId) contact.userId = userId;

  elements.saveButton.disabled = true;
  elements.saveButton.textContent = text("saving");
  elements.formError.hidden = true;
  try {
    await addDoc(collection(db, "contacts"), contact);
    elements.dialog.close();
  } catch (error) {
    console.error(text("saveError"), error);
    elements.formError.textContent = `${text("saveError")} (${error.code || error.message})`;
    elements.formError.hidden = false;
  } finally {
    elements.saveButton.disabled = false;
    elements.saveButton.textContent = text("save");
  }
});

setLanguage("ar");
