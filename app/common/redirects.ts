// ---------------------
// Index
// ---------------------
export function redirectToIndexPage(): void {
    navigateTo('/')
}

export function redirectToHomePage(): void {
    navigateTo('/home')
}

// ---------------------
// Auth
// ---------------------
export function redirectToLoginPage(): void {
    navigateTo('/auth/login')
}

export function redirectToSignUpPage(): void {
    navigateTo('/auth/login')
}