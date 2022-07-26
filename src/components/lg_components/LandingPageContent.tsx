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

	const review_slides = [{ src: "../../assets/Review1.jpg", alt: "Review 1" },
		{ src: "../../assets/Review2.jpg", alt: "Review 2" },
		{ src: "../../assets/Review3.jpg", alt: "Review 3" },
		{ src: "../../assets/Review4.jpg", alt: "Review 4" },
		{ src: "../../assets/Review5.jpg", alt: "Review 5" },
		{ src: "../../assets/Review6.jpg", alt: "Review 6" },
		{ src: "../../assets/Review7.jpg", alt: "Review 7" },
		{ src: "../../assets/Review8.jpg", alt: "Review 8" }]
	
	return (
		<div id="page-top" className='w-screen max-w-screen overflow-hidden body'>
			<div id="navbar" className='max-w-screen bg-[#b3dec1] overflow-hidden'>
				<a href="#about" >About</a>
				<a href="#news">News</a>
				<a href="#skills">Info</a>
				<a href="#properties">Property</a>
				<a href="#review">Reviews</a>
				<a href="#contact">Contact</a>
				
				
			</div>
       
			{/* <!-- Masthead--> */}
			<header className="masthead max-w-full">
				<div className="max-w-full">
					<div className="row align-items-center justify-content-center text-center">
						<div className="col-lg-10 align-self-end">
							<p className="text-uppercase text-white font-weight-bold text-xl heading">Gilderise Enterprises and Properties</p>
							<hr className="divider dark my-4" />
						</div>
						<div className="col-lg-8 align-self-baseline">
							<p className="text-uppercase text-white font-weight-bold heading ">A Property Management Company</p>

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
							<p className="text-white mt-0 text-lg heading">FACING PROPERTY MANAGEMENT TROUBLES?</p>
							{/* <!--<p> We are here to help!</p>--> */}
							<hr className="divider dark my-4" />
							
							<img alt="GEBalance" src={require("../../assets/BrandImage.jpg")} className="w-full md:px-10"/>
							
							<p className="pcontrol text-white">Gilderise Enterprises has been helping retirement communities manage their property needs for over fifteen years. We provide a full-scale property management service to any homeowner associations and condominium boards. We are contantly working to maximize property values and create ideal lifestyles that residents can enjoy. We provide incomparable levels of service and expertise! Our main focus is on building long-lasting relationships with HOAs and boards of directors who share our vision and commitment to a better lifestyle for all.</p>
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
							<p className='text-lg heading'>Planning to expand into North East Texas!</p>
							<p className="pcontrol">Gilderise Enterprise has been growing throughout Florida and Georgia. We currently manage over 60,000 units across over 80 communities, including prestigious locations such as Delray River Reserve, Naples Creek Estates, Village Path of Concord, and Garland Reserve. In Central Georgia, we now have a prominent presence and we’re happy to be expanding throughout the North East Texas and St. Colombus area, as we continue to grow our services and our family continues to grow.</p>
							<p className='text-lg heading'>Maintenance, Repairs & Renovations  </p>
							<p className="pcontrol">Due to our long-lasting relationships with contractors, we can contact our maintenance team quickly & repair your property below quicker and at a lower price than normal contractors. 
This means less money out of your pockets AND more return on your investment.  </p>
							
							<p className="text-lg heading">Property Marketing and Remodling</p>
							<p className="pcontrol"> We have implemented many proven marketing strategies that can be specifically tailored to your property. which will nclude listing your property on over 200 of the top real estate websites. We then track the performance of our marketing plan, which allows us to quickly make adjustmentsto make marketing your property more effective.Our property managers have the potential of arranging necessary renovations before listing it on the market. This can be as small as repainting the walls, or as important as changing the partitions inside the house. Our team will first assess your property’s value, and then come to you with a list of suggestions fitted to your every need. </p>
						</div>
					</div>
				</div>
			</section>
            
			{/* <!-- Services--> */}
			<section className="page-section" id="skills">
				<div className="max-w-full">
					<p className="textcenter mt-0 text-lg heading">An Enterprise You Can Trust</p>
					<hr className="divider my-4" />
					<div className="skillsutility">
							
						<table className='min-w-full'>
							<tbody>
								<tr >
									<th>Properties</th>
									<th>Locations</th>
									<th>Communities</th>
								</tr>
								<tr>
									<td>1,000 Houses</td>
									<td>Florida</td>
									<td>West Boca MB Retirement Community</td>
								</tr>
								<tr>
									<td>1,500 Condos</td>
									<td>Georgia</td>
									<td>Unity Springs Retirement Community</td>
								</tr>
								<tr>
									<td>1270 Apartments</td>
									<td>North Carolina</td>
									<td>Sun City Peachtree Retirement Community</td>
								</tr>
							</tbody>
						</table>
							
                  
						<table className='min-w-full'>
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
									<td>Always On Standby</td>
								</tr>
							</tbody>
						</table>

					</div>
				</div>
			</section>



			<section className="page-section bg-six" id="properties">
				<div className="max-w-full">
					<p className="text-center mt-0 text-lg">PROPERTIES</p>
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