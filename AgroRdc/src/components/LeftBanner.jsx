import logo from "../assets/logo.jpeg";
import Icon from './Icon.jsx'

export default function LeftBanner({ imageUrl, subtitle, infoIcon, infoTitle, infoText, footer }) {
    const backgroundImage = imageUrl
        ? `linear-gradient(rgba(0,63,135,0.85),rgba(0,63,135,0.95)),url('${imageUrl}')`
        : `linear-gradient(rgba(0,63,135,0.85),rgba(0,63,135,0.95))`

    return (
        <section
            className="hidden md:flex flex-col justify-between p-10 text-white bg-cover bg-center"
            style={{ backgroundImage }}
        >
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    {/*<Icon name={icon} className="h-5 w-5 text-[40px]" />*/}
                    <div className="w-48 h-16 rounded-lg overflow-hidden">
                        <img
                            alt="Logo AgriRDC"
                            src={logo}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/*<h1 className="text-2xl font-bold tracking-tight">{title}</h1>*/}
                </div>
                <p className="text-lg opacity-90 max-w-sm mt-10">{subtitle}</p>
            </div>

            <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                        <Icon name={infoIcon} className="h-5 w-5 text-banner-accent" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-banner-accent">
                            {infoTitle}
                        </span>
                    </div>
                    <p className="text-sm text-banner-text">{infoText}</p>
                </div>
                {footer}
            </div>
        </section>
    )
}
