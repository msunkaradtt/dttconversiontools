

const Nav = () => (
    <nav className="p-4 flex items-center justify-end w-full bg-zinc-300 z-10 relative">
        <p className="text-xs font-bold">
            Check out your model {' '}
            after conversion with {' '}
            <a
            className="underline text-emerald-800 hover:text-emerald-600"
            href="https://gltf.pmnd.rs/"
            target="_blank"
            rel="noreferrer">
            GLTFJSX.
            </a>
        </p>
    </nav>
)

export default Nav