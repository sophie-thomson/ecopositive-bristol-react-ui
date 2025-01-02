import React from "react";
import styles from "../../styles/TopCompanies.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import TopCompanies from "./TopCompanies";


const TopCompany = (props) => {
    // const { 
    //     company, 
    //     mobile, 
    //     imageSize = 55,
    // } = props;
    
    const { 
        id, 
        logo, 
        name, 
        endorsements_count, 
    } = props;

    return (
        <div
            className={`my-3 d-flex align-items-center`}
        >
        <div>
            <Link className="align-self-center" to={`/companies/${id}`}>
                <Avatar src={logo} />
            </Link>
        </div>
        <div className={`mx-2 ${styles.WordBreak}`}>
            <strong>{name}</strong>
            <i className="fa-solid fa-award" />
            ({endorsements_count})
        </div>
      
        </div>
    );
};

export default TopCompany;