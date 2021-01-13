import React, { PureComponent } from 'react';
// import styles from './Services.module.scss';
interface IServicesProps { }

interface IServicesState { }

class About extends PureComponent<IServicesProps, IServicesState> {
	public state: IServicesState = {
	}
	public render() {
		return (
				
      <div> 
         <div className="container-flex">
        <div>
          
            <div className="jumbotron text-center" >
                <h1>About Us</h1>
                <p>Resize this responsive page to see the effect!</p>
            </div>

           

            <div className="container">
                <div className="row">
                       </div>
            </div>

            <div className="jumbotron text-center" >
                <p>Footer</p>
            </div>
        </div>
    </div>
      </div> 
		 
		);
	}
 
}
export default About;
