import { Link } from 'react-router-dom';
const BreadCrumb = ({ items }) => {
    return (
        <>
            <section className="bread-crumb">
                <div className="breadcrumb-container">
                    <ul className="breadcrumb d_flex al_ct">
                        {items && items.map((item, index) => (
                            <li key={index} className={item.class + (item.url ? "" : " d_flex al_ct")}>
                                {item.url ? (
                                    <Link to={item.url} className={item.class}>
                                        {item.title}
                                    </Link>
                                ) : (
                                    item.title
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}
export default BreadCrumb;