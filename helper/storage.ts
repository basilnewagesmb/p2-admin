import { cookies } from "next/headers"

export async function saveString(key: string, value: string) {
  const appCookie = cookies()
  ;(await appCookie).set(key, value)
}

export async function loadString(key: string) {
  const appCookie = cookies()
  return (await appCookie).get(key)?.value
}

export async function getAllCookies() {
  const appCookie = cookies()
  ;(await appCookie).getAll()
}

export async function deleteCookies(key: string) {
  const appCookie = cookies()
  ;(await appCookie).delete(key)
}

export async function clearAll() {
  const appCookie = cookies()
  const data = (await appCookie).getAll()
  data.forEach((item) => {
    deleteCookies(item.name)
  })
}