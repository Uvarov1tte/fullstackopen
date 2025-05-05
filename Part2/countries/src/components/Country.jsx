export default function Country({ country }) {
    return (
        <>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>

            <h2>Languages</h2>
            {Object.object(country.languages).map((lang) => <p key={lang} >{country.languages.lang}</p>)}
            <img src={country.flags.png} alt={country.flags.alt} />
        </>
    )
}