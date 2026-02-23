interface props {
    nombre?: string,
    color?: string
}

export const MensajeBienvenida = (props: props) => {
    const {nombre, color} = props
    const hexColor = color || '#3122b8';
    return(
        <div className="flex w-full">
            <h3 className="text-2xl font-semibold md:flex" style={{ color: hexColor }}>
                Bienvenido,&nbsp; 
                <p className="">
                    {nombre || "Usuario"}
                </p>
            </h3>
        </div>
    ) 
}