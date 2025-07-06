// ---------------------
// Index
// ---------------------
export function redirectToIndexPage(): void {
    navigateTo('/')
}

export function redirectToHomePage(): void {
    navigateTo('/home')
}

export function redirectToWelcomePage(): void {
    navigateTo('/welcome')
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