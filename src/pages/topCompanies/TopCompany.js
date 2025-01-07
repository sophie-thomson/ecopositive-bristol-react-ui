import React from "react";
import styles from "../../styles/TopCompanies.module.css";
import { Link } from "react-router-dom";


const TopCompany = (props) => {
    const { 
        company, 
        mobile, 
        imageSize = 50,
    } = props;
    
    const { 
        id, 
        logo, 
        name,
    } = company;

    return (
        <div
            className={`${styles.Company} 
                my-3 d-flex align-items-center flex-wrap flex-column`
            }
        >
            
            <div>
                <Link className="align-self-center" to={`/companies/${id}`}>
                    <img 
                        src={logo} 
                        className={`${mobile ? styles.Logo : ''}`}
                        width={imageSize} 
                        alt="{name} logo" 
                    />
                </Link>
            </div>
            <div className={`mx-2 ${styles.Name}`}>
                <Link className="text-center ml-2 text-wrap" to={`/companies/${id}`}>
                    <strong>{name}</strong>
                </Link>
            </div>
        </div>
    );
};

export default TopCompany;