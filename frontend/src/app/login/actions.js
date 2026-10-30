"use server";

import { cookies } from "next/headers";

export async function prosesLogin(formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  // GANTI INI dengan Username dan Password rahasia Anda!
  const validUsername = "adminmnco";
  const validPassword = "mnco123";

  if (username === validUsername && password === validPassword) {
    const cookieStore = await cookies(); // Gunakan await di sini

    cookieStore.set("admin_session", "tiket_rahasia_mnco", {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24, // 24 Jam
    });
    return { success: true };
  } else {
    // Jika salah, kembalikan pesan error
    return { success: false, message: "Username atau Password salah!" };
  }
}
