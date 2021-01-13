import React, { PureComponent } from 'react';
import {  Link } from "react-router-dom";
import Home from '../Home/Home';
import Services from '../Services/Services';
import styles from './Header.module.scss';

 

interface IHeaderProps {
	// onSelect: (selected: string) => void;
}

interface IHeaderState {
	menuActive: string;
}

class Header extends PureComponent<IHeaderProps, IHeaderState> {
	public state: IHeaderState = {
		menuActive: "",
	}
 
	constructor(props: any, state: any) {
		super(props, state);
	}
	  menuActive(menu: any) {
		this.setState({ menuActive: menu });
	  }

	public render() {
 
		return (
			<nav className={styles.navbar}>
				<div className={styles.container}>
					<a className={styles.navbarBrand} href="#"> Catch Me </a>
			
					<div className={styles.navbarResponsive}>
						<ul className="">
							<li className="nav-item active">
								<Link  to={"/"} onClick={() => this.menuActive("home")} id="home" className={  this.state.menuActive === "home" ? "menuActive" : "" }  > Home  </Link>
							</li>
							<li>
								<Link  to={"/services"}  onClick={() => this.menuActive("services")}  id="services" className={this.state.menuActive === "services" ? "menuActive" : "" } > Services  </Link>
							</li>
							<li>
								<Link  to={"/about"}  onClick={() => this.menuActive("about")}  id="about"  className={this.state.menuActive === "about" ? "menuActive" : "" } > About  </Link>
							</li>
							
							<li>
								<Link  to={"/contact"}  onClick={() => this.menuActive("contact")}  id="contact" className={this.state.menuActive === "contact" ? "menuActive" : "" } > Contact  </Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
 
}
export default Header;










 