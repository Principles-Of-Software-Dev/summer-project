import React, { useEffect } from 'react'
import '../../styles/LandingPageStyle.css'


const LandingPageContent = () => {
	let slideIndex = 1 ;
	let slides ;
	let dots ;

	useEffect(() => { 
		slides = Array.prototype.slice.call(document.getElementsByClassName("mySlides")) ;
		dots = Array.prototype.slice.call(document.getElementsByClassName("dot")) ;
		showSlides(slideIndex) ;
	}, [])
	
                    
	// Next/previous controls
	function plusSlides(n) {
		showSlides(slideIndex += n) ;
	}
                    
	// Thumbnail image controls
	function currentSlide(n) {
		showSlides(slideIndex = n) ;
	}
                    
	function showSlides(n) {
		let i ;
		if (n > slides.length) { slideIndex = 1 }
		if (n < 1) { slideIndex = slides.length }
		for (i = 0 ; i < slides.length ; i++) {
			slides[i].classList.add("hide") ;
		}
		for (i = 0 ; i < dots.length ; i++) {
			dots[i].className = dots[i].className.replace(" active", "") ;
		}
		slides[slideIndex-1].classList.remove("hide") ;
		slides[slideIndex - 1].classList.add("show") ;
		dots[slideIndex-1].className += " active" ;
	}
	
	return (
		<div id="page-top" className='w-screen max-w-screen overflow-hidden body'>
			<div id="navbar" className='max-w-screen bg-[#b3dec1] overflow-hidden'>
				<a href="#about" >About</a>
				<a href="#news">News</a>
				<a href="#skills">Info</a>
				<a href="#item">Items</a>
				<a href="#review">Reviews</a>
				<a href="#contact">Contact</a>
				
				
			</div>
       
			{/* <!-- Masthead--> */}
			<header className="masthead max-w-full">
				<div className="max-w-full">
					<div className="row align-items-center justify-content-center text-center">
						<div className="col-lg-10 align-self-end">
							<p className="text-uppercase text-white font-weight-bold text-xl heading">Gilderise Communities</p>
							<hr className="divider dark my-4" />
						</div>
						<div className="col-lg-8 align-self-baseline">
							<p className="text-uppercase text-white font-weight-bold heading ">Asset Management for West Boca Make-Believe Community</p>

							<div className="imgcontainer"><img className="w-full md:px-10 px-4" alt="Entrance" src={require("../../assets/EntrancePhoto.jpg")} /></div>

						</div>
					</div>
				</div>
			</header>
			{/* <!-- About--> */}
			<section className="page-section bg-primary" id="about">
				<div className="w-full p-4">
					<div className="row justify-content-center">
						<div className="col-lg-8 text-center">
							<p className="text-white mt-0 text-lg heading">FACING INVENTORY MANAGEMENT TROUBLES?</p>
							{/* <!--<p> We are here to help!</p>--> */}
							<hr className="divider dark my-4" />
							
							<img alt="GEBalance" src={require("../../assets/BrandImage.jpg")} className="w-full md:px-10"/>
							
							<p className="pcontrol text-white">Gilderise Communities have been helping
retirement communities manage their household items and many other needs for over fifteen
years. We provide a full-scale organizational service to all of our residents at Gilderise
Communites. We are contantly working to maximize the funcaionality of our website so that it is
simple and ready for you to use. We provide incomparable levels of service and expertise! Our
main focus is on building long-lasting relationships with our residents and we share our vision
and commitment to a better lifestyle for all.</p>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- About--> */}
			<section className="page-section bg-tertiary" id="news">
				<div className="max-w-full">
					<div className="p-6 justify-content-center">
						<div className="col-lg-8 text-center">
							<p className="text-black-75 mt-0 text-xl heading">News</p>
							<hr className="divider light my-4" />
							
							<div className="text-black-50 mb-4" />
							<p className='text-lg heading'>Our focus is you!</p>
							<p className="pcontrol">Gilderise Enterprise takes a different approach to the way we help with asset management. Our focus is quality. Managing tangile assets through us is simple, easy to underestand and reliable. If you are every having any difficulties it is as simple as contacting out support page and our staff will contact you promptly with a solution. We treat the residents of West Boca Make-Believe Retirement Community. We hope you will see us as family too. Register now and join the our family!</p>
							<p className='text-lg heading'>Maintenance, Repairs & Renovations  </p>
							<p className="pcontrol">Due to our long-lasting relationships with contractors, we can contact our maintenance team quickly & repair your property below quicker and at a lower price than normal contractors. 
This means less money out of your pockets AND more return on your investment.  </p>
							
							<p className="text-lg heading">Care Type Services</p>
							<p className="pcontrol"> We also provide any care you might need here at Gilderise
Communities whether that is Memory Care, Assisted living, Skilled Nursing, or Independent
living. We are here for you and to help in any way that we see fit. Please don't hesitate to
contact us at any time. We respond to any communication within the hour 24 hours a day! </p>
						</div>
					</div>
				</div>
			</section>
            
			{/* <!-- Services--> */}
			<section className="page-section" id="skills">
				<div className="max-w-full">
					<p className="textcenter mt-0 text-lg heading">A Community You Can Trust</p>
					<hr className="divider my-4" />
					<div className="skillsutility">
							
						<table className='min-w-full'>
							<tbody>
								<tr >
									<th>Why Register</th>
									<th>Locations</th>
									<th>Communities</th>
								</tr>
								<tr>
									<td>Easy To Use User Interface</td>
									<td>Florida</td>
									<td>West Boca MB Retirement Community</td>
								</tr>
								<tr>
									<td>Responsive Customer Support</td>
									<td>Georgia</td>
									<td>Unity Springs Retirement Community</td>
								</tr>
								<tr>
									<td>Free For Residents Of Our Communities</td>
									<td>North Carolina</td>
									<td>Sun City Peachtree Retirement Community</td>
								</tr>
							</tbody>
						</table>
							
                  
						<table className='min-w-full my-10'>
							<tbody>
								<tr>
									<th>Communities Helped</th>
									<th>Employees</th>
								</tr>
								<tr>
									<td>Over 15</td>
									<td>Over 2000 Now</td>
								</tr>
								<tr>
									<td>Expanding Elsewhere</td>
									<td>Ready To Help You At All Hours!</td>
								</tr>
							</tbody>
						</table>

					</div>
				</div>
			</section>



			<section className="page-section bg-six" id="properties">
				<div className="max-w-full">
					<p className="text-center mt-0 text-lg">INVENTORY</p>
					<hr className="divider my-4" />
					<div className="skillsutility">


						<div className="slideshow-container">
                
							{/* <!-- Full-width images with number and caption text --> */}
							<div className="mySlides fade">
								<div className="numbertext">1 / 4</div>
								<img src={require("../../assets/Slide1.jpg")} className='w-full' alt={"Test"} />
								<div className="text"></div>
							</div>
                
							<div className="mySlides fade">
								<div className="numbertext">2 / 4</div>
								<img src={require("../../assets/Slide2.jpg")} className='w-full'alt={"Test"}  />
								<div className="text"></div>
							</div>
                
							<div className="mySlides fade">
								<div className="numbertext">3 / 4</div>
								<img src={require("../../assets/Slide3.jpg")} className='w-full' alt={"Test"} />
								<div className="text"></div>
							</div>

							<div className="mySlides fade">
								<div className="numbertext">4 / 4</div>
								<img src={require("../../assets/Slide4.jpg")} className='w-full' alt={"Test"} />
								<div className="text"></div>
							</div>
                
							{/* <!-- Next and previous buttons --> */}
							<a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
							<a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
						</div>
                
						{/* <!-- The dots/circles --> */}
						<div className='text-center'>
							<span className="dot" onClick={() => currentSlide(1)}></span>
							<span className="dot" onClick={() => currentSlide(2)}></span>
							<span className="dot" onClick={() => currentSlide(3)}></span>
							<span className="dot" onClick={() => currentSlide(4)}></span>
						</div>
					</div>
				</div>
			</section>

                
			<section className="page-section bg-cinco" id="review">
				<div className="max-w-full">
					<p className="text-center mt-0 text-lg">REVIEWS</p>
					<hr className="divider my-4" />
					<div className="skillsutility ">
						<div className="row2">
							<div className="md:float-left md:w-[24%] md:p-[5px] md:my-0 my-2">
								<img src={require("../../assets/Review1.jpg")} alt="Review 1" />
							</div>
							<div className="md:float-left md:w-[24%] md:p-[5px] md:my-0 my-2">
								<img src={require("../../assets/Review2.jpg")} alt="Review 2" />
							</div>
							<div className="md:float-left md:w-[24%] md:p-[5px] md:my-0 my-2">
								<img src={require("../../assets/Review3.jpg")}
									alt="Review 3" />
							</div>
							<div className="md:float-left md:w-[24%] md:p-[5px] md:my-0 my-2">
								<img src={require("../../assets/Review4.jpg")}
									alt="Review 4" />
							</div>
							<div className="md:float-left md:w-[24%] md:p-[5px] md:my-0 my-2">
								<img src={require("../../assets/Review5.jpg")}
									alt="Review 5" />
							</div>
							<div className="md:float-left md:w-[24%] md:p-[5px] md:my-0 my-2">
								<img src={require("../../assets/Review6.jpg")}
									alt="Review 6" />
							</div>
							<div className="md:float-left md:w-[24%] md:p-[5px] md:my-0 my-2">
								<img src={require("../../assets/Review7.jpg")}
									alt="Review 7" />
							</div>
							<div className="md:float-left md:w-[24%] md:p-[5px] md:my-0 my-2">
								<img src={require("../../assets/Review8.jpg")}
									alt="Review 8" />
							</div>
						</div>
						{/* <!-- <p className="para">
                    </p>--> */}
					</div>

				</div>
			</section>

			{/* <!-- Call to action--> */}
			{/* <!-- Contact--> */}
        
			<section className="page-section" id="contact">
				<div className="black">
					
				</div>
				<div className="max-w-full">
					<div className="row justify-content-center">
						<div className="col-lg-8 text-center">
							<p className="mt-0 text-lg heading">CONTACT INFORMATION</p>
							<hr className="divider my-4" />
							
							{/* <!--<p className="pcontrol">Headquarters: 21319 NE 103rd Street, Suite 222
                Miami, FL 33122</p></p>--> */}
							
							<div className="text-black">
								<img src={require("../../assets/GEContact.png")} alt="Contact Information" className="w-full md:px-10 px-4" />
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
							<i className="fas fa-phone fa-3x mb-3 text-muted"></i>
                      
						</div>
						<div className="col-lg-4 mr-auto text-center">
							<i className="fas fa-envelope fa-3x mb-3 text-muted"></i>

						</div>
					</div>
				</div>
			</section>
			{/* <!-- Footer--> */}
			<footer>
				<div className="bg-light py-5">
					<div className="">
						<p className="small text-center text-black">Copyright © 2022 - Gilderise Enterprises</p>
					</div>
				</div>
			</footer>
               

		</div>
	)
}

export default LandingPageContent
