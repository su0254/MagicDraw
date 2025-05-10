export type Drawing = {
id: string,
fileName:string,       // מזהה ייחודי
categoryName: string; // קטגוריה
// url: string; // כתובת התמונה
userId: string; // מזהה המשתמש שצייר את התמונה  
imageFile: File;
}