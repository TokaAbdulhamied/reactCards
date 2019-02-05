import React, { Component } from "react";
import VacancyCard from "../Components/VacancyCard";
import Loading from "../Components/Loading";
import client, { refreshAuthHeaders } from "../API_calls/client";

class Vacancy extends Component {
    state={loading:true,vacancies:[]}

    componentDidMount(){
        client
      .get("/ACG/relevantvacancies/")
      .then(response => {
       this.setState({vacancies:response.data.vacancies})
       this.setState({loading:false})
       console.log(response.data.vacancies);       
      })
      .catch(error => {
        console.log(error);
      });
        
    }

    
 render() {
  if(!this.state.loading)
  {
    return (
        
        <div>
        {this.state.vacancies.map((vacancy)=>                    
        {     
        return <VacancyCard 
          key={vacancy.id} 
          id={vacancy.id} 
          name={vacancy.name}
          department={vacancy.department}      
          creation_date={vacancy.creation_date}
          image={vacancy.company.logo}
          />
        })}
            
      </div>
      
    );
  }
  else 
  {
    return <Loading />
  } 
}

 
}
export default Vacancy ;