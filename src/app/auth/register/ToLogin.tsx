import Link from 'next/link'

export default function ToLogin() {
    return (
        <Link href={'/auth/login'} 
        className='absolute right-5 top-3 text-white border-2
        rounded-md border-blue-700 px-7  py-2 '>
            Login
        </Link>
    )
}
