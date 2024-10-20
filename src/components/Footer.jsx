

const Footer = () => (
    <footer className="p-4 flex items-center justify-between w-full bg-zinc-300 z-10 relative">
        <a className="text-xs font-bold underline text-emerald-800 hover:text-emerald-600" href="https://www.digitaltwin.technology/" target="_blank" rel="noreferrer">
        DigitalTwin Technology GmbH.
        </a>
        <p className="text-xs font-bold">
            Made by{' '}
            <a
            className="underline text-emerald-800 hover:text-emerald-600"
            href="https://msunkara.de/"
            target="_blank"
            rel="noreferrer">
            @MSunkara.
            </a>
        </p>
    </footer>
)

export default Footer