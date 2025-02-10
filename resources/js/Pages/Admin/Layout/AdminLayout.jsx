import { Link } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <Link href={route('admin.dashboard')}>Dashboard</Link>
                <Link href={route('admin.applications')}>Applications</Link>
            </aside>
            <main className="admin-content">
                {children}
            </main>
        </div>
    );
}