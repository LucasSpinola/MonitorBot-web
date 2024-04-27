async function createAccount(formData: FormData) {
    'use server'

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const id = formData.get('id') as string;
    const password = formData.get('password') as string;
    
}
