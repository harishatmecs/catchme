import React, { PureComponent } from 'react';
 
import styles from './Header.module.scss';

  

interface IHeaderProps {

}

interface IHeaderState {
}

class Header extends PureComponent<IHeaderProps, IHeaderState> {
	public state: IHeaderState = {
	}
	public render() {
		return (
			<nav className="navbar navbar-expand-lg static-top">
	<div className="container">
		<a className="navbar-brand" href="#">
			<img src="https://www.tutorialrepublic.com/examples/images/logo.svg" alt="" />
			</a>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
			</button>
		<div className="collapse navbar-collapse" id="navbarResponsive">
		<ul className="navbar-nav ml-auto">
			<li className="nav-item active">
			<a className="nav-link" href="#">Home
					<span className="sr-only">(current)</span>
				</a>
			</li>
			<li className="nav-item">
			<a className="nav-link" href="#">About</a>
			</li>
			<li className="nav-item">
			<a className="nav-link" href="#">Services</a>
			</li>
			<li className="nav-item">
			<a className="nav-link" href="#">Contact</a>
			</li>
		</ul>
		</div>
	</div>
	</nav>
		);
	}
 
}
export default Header;
