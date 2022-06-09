import { useEffect } from "react";
import { getApiResource } from "../../utils/network";
import { API_PEOPLE } from "../../constans/api";
import { useState } from "react";
import { getPeopleId, getPeopleImage } from "../../services/getPeopleData";
import { withErrorApi } from "../../hoc-helpers/withErrorApi";
import PeopleList from "../../components/PeplePage/PeopleList";



const PeoplePage = ({setErrorApi}) => {
    const [people, setPeople] = useState(null);

    const getResource = async (url) => {
        const res = await getApiResource(url);

        if (res) {
            const peopleList = res.results.map(({name, url}) => {
                const id = getPeopleId(url);
                const img = getPeopleImage(id);
                
                return {
                    id,
                    name,
                    img
                }
            })
    
            setPeople(peopleList);
            setErrorApi(false);
        } else {
            setErrorApi(true)
        }
    }

    useEffect(() => {
        getResource(API_PEOPLE);
    }, []);
    
    return (
        <>
            <h1>Navigation</h1>
            {people && <PeopleList people={people}/>}
        </>
    );
}

export default withErrorApi(PeoplePage);   

