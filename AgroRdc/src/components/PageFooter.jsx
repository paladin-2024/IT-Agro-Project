import Icon from './Icon.jsx'

export default function PageFooter({ links }) {
    return (
        <footer className="text-center pt-8">
            <div className="flex justify-center gap-6 text-outline">
                {links.map(({ icon, href, ariaLabel }) => (
                    <a key={icon} href={href} aria-label={ariaLabel} className="hover:text-primary transition-colors">
                        <Icon name={icon} className="h-5 w-5" />
                    </a>
                ))}
            </div>
            <p className="mt-3 text-xs text-outline">
                © {new Date().getFullYear()} AgriRDC RDC. Tous droits réservés.
            </p>
        </footer>
    )
}
