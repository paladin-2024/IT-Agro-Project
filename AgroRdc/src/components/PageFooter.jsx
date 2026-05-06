export default function PageFooter({ links }) {
    return (
        <footer className="text-center pt-8">
            <div className="flex justify-center gap-6 text-outline">
                {links.map(({ icon, href, ariaLabel }) => (
                    <a key={icon} href={href} aria-label={ariaLabel} className="hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">{icon}</span>
                    </a>
                ))}
            </div>
            <p className="mt-3 text-xs text-outline">
                © {new Date().getFullYear()} AgriRDC RDC. Tous droits réservés.
            </p>
        </footer>
    )
}
