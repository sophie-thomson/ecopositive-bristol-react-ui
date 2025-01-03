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
        endorsements_count, 
    } = company;

    return (
        <div
        className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
        >
        <div>
            <Link className="align-self-center" to={`/companies/${id}`}>
                <img src={logo} width={imageSize} alt="{name} logo" />
            </Link>
        </div>
        <div className={`mx-2 ${styles.Name}`}>
            <Link className="align-self-center" to={`/companies/${id}`}>
                <strong>{name}</strong>
            </Link>
            <i className="fa-solid fa-award" />
            ({endorsements_count})
        </div>
      
        </div>
    );
};

export default TopCompany;