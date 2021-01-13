import React, { PureComponent } from 'react';
 import styles from './Contact.module.scss';
interface IServicesProps { }

interface IServicesState { }

class Contact extends PureComponent<IServicesProps, IServicesState> {
	public state: IServicesState = {
	}
	public render() {
		return (
				
      <div> 
         <div className="container-flex">
        <div>
          
            <div className="jumbotron text-center" >
                <h1>Contact Us</h1>
                <p>Resize this responsive page to see the effect!</p>
            </div>

           

            <div className="container">
                <div className="row">
               
                    <div className="col-md-5 col-md-offset-3">
                        <div className={styles.formMessage} id="formMessage"></div>
                        <form>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control" id="firstname" placeholder="First Name"/>
                            </div>


                            <div className="form-group">
                                <label >Last Name</label>
                                <input type="text" className="form-control" id="lastname" placeholder="Last Name"/>
                            </div>

                            <div className="form-group">
                                <label >Phone Number</label>
                                <input type="text" className="form-control" id="phonenumber" placeholder="Phone Number"/>
                            </div>
                            <div className="form-group">
                                <label >Message</label>
                                <input type="text" className="form-control" id="message" placeholder="Message"/>
                            </div>

                            <button type="submit" className="btn btn-primary" id="submit">Submit</button>
                        </form>
                        <br/> </div>
                </div>
            </div>
                       </div>
            </div>

            <div className="jumbotron text-center" >
                <p>Footer</p>
            </div>
        </div>
 
		 
		);
	}
 
}
export default Contact;
