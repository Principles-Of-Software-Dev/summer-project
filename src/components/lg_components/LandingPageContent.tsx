import React from 'react'

const LandingPageContent = () => {
	let slideIndex = 1 ;
	showSlides(slideIndex) ;
                    
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
		let slides = document.getElementsByClassName("mySlides") ;
		let dots = document.getElementsByClassName("dot") ;
		if (n > slides.length) { slideIndex = 1 }
		if (n < 1) { slideIndex = slides.length }
		for (i = 0 ; i < slides.length ; i++) {
			// slides[i].style.display = "none";
		}
		for (i = 0 ; i < dots.length ; i++) {
			dots[i].className = dots[i].className.replace(" active", "") ;
		}
		//   slides[slideIndex-1].style.display = "block";
		//   dots[slideIndex-1].className += " active";
	}
	window.onscroll = function() { scrollFunction() } ;
        
	function scrollFunction() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			// document.getElementById("navbar").style.top = "0";
			// } else {
			// document.getElementById("navbar").style.top = "-50px";
		}
	}
	return (
		<div id="page-top">

			<div id="navbar">
				<a href="#about">About</a>
				<a href="#news">News</a>
				<a href="#skills">Info</a>
				<a href="#properties">Property</a>
				<a href="#review">Reviews</a>
				<a href="#contact">Contact</a>
				<br />
				<br />
			</div>
      
       
			{/* <!-- Masthead--> */}
			<div className="masthead">
				<div className="container h-100">
					<div className="row h-100 align-items-center justify-content-center text-center">
						<div className="col-lg-10 align-self-end">
							<h1 className="text-uppercase text-white font-weight-bold">Gilderise Enterprises and Properties</h1>
							<hr className="divider dark my-4" />
						</div>
						<div className="col-lg-8 align-self-baseline">
							<h5 className="text-uppercase text-white font-weight-bold">A Property Management Company</h5>

							<br />
							<br />
							<br />
							<br />
							<div className="imgcontainer"><img className="imgh" alt="Entrance" src="assets/EntrancePhoto.jpg" /></div>

						</div>
					</div>
				</div>
			</div>
			{/* <!-- About--> */}
			<section className="page-section bg-primary" id="about">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-8 text-center">
							<h2 className="text-white mt-0">FACING PROPERTY MANAGEMENT TROUBLES?</h2>
							{/* <!--<p> We are here to help!</p>--> */}
							<hr className="divider dark my-4" />
							<br />
							<br />
							<img alt="GEBalance" src="assets/BrandImage.jpg" />
							<br />
							<br />
							<br />

							<p className="pcontrol text-white">Gilderise Enterprises has been helping retirement communities manage their property needs for over fifteen years. We provide a full-scale property management service to any homeowner associations and condominium boards. We are contantly working to maximize property values and create ideal lifestyles that residents can enjoy. We provide incomparable levels of service and expertise! Our main focus is on building long-lasting relationships with HOAs and boards of directors who share our vision and commitment to a better lifestyle for all.</p>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- About--> */}
			<section className="page-section bg-tertiary" id="news">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-8 text-center">
							<h2 className="text-black-75 mt-0">News</h2>
							<hr className="divider light my-4" />
							<br />
							<p className="text-black-50 mb-4" />
							<h3>Planning to expand into North East Texas!</h3>
							<p className="pcontrol">Gilderise Enterprise has been growing throughout Florida and Georgia. We currently manage over 60,000 units across over 80 communities, including prestigious locations such as Delray River Reserve, Naples Creek Estates, Village Path of Concord, and Garland Reserve. In Central Georgia, we now have a prominent presence and we’re happy to be expanding throughout the North East Texas and St. Colombus area, as we continue to grow our services and our family continues to grow.</p>
							<h3>Maintenance, Repairs & Renovations  </h3>
							<p className="pcontrol">Due to our long-lasting relationships with contractors, we can contact our maintenance team quickly & repair your property below quicker and at a lower price than normal contractors. 
This means less money out of your pockets AND more return on your investment.  </p>
							<br />
							<h3>Property Marketing and Remodling</h3>
							<p className="pcontrol"> We have implemented many proven marketing strategies that can be specifically tailored to your property. which will nclude listing your property on over 200 of the top real estate websites. We then track the performance of our marketing plan, which allows us to quickly make adjustmentsto make marketing your property more effective.Our property managers have the potential of arranging necessary renovations before listing it on the market. This can be as small as repainting the walls, or as important as changing the partitions inside the house. Our team will first assess your property’s value, and then come to you with a list of suggestions fitted to your every need. </p>
						</div>
					</div>
				</div>
			</section>
            
			{/* <!-- Services--> */}
			<section className="page-section" id="skills">
				<div className="container">
					<h2 className="textcenter mt-0">An Enterprise You Can Trust</h2>
					<hr className="divider my-4" />
					<div className="skillsutility">
						<p className="para" >
							<br />
							<br />
							<table className='w-full'>
								<tr>
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
							</table>
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
                  
							<table className='w-full'>
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

							</table>
                  -

						</p>
					</div>
				</div>
			</section>



			<section className="page-section bg-six" id="properties">
				<div className="container">
					<h2 className="textcenter mt-0">PROPERTIES</h2>
					<hr className="divider my-4" />
					<div className="skillsutility">


						<div className="slideshow-container">
                
							{/* <!-- Full-width images with number and caption text --> */}
							<div className="mySlides fade">
								<div className="numbertext">1 / 4</div>
								<img src="../../assets/Slide1.jpg" className='w-full' alt={"Test"} />
								<div className="text"></div>
							</div>
                
							<div className="mySlides fade">
								<div className="numbertext">2 / 4</div>
								<img src="../../assets/Slide2.jpg" className='w-full'alt={"Test"}  />
								<div className="text"></div>
							</div>
                
							<div className="mySlides fade">
								<div className="numbertext">3 / 4</div>
								<img src="../../assets/Slide3.jpg" className='w-full' alt={"Test"} />
								<div className="text"></div>
							</div>

							<div className="mySlides fade">
								<div className="numbertext">4 / 4</div>
								<img src="../../assets/Slide4.jpg" className='w-full' alt={"Test"} />
								<div className="text"></div>
							</div>
                
							{/* <!-- Next and previous buttons --> */}
							<a className="prev" onClick={() => plusSlides(-1)}>&#10094;</a>
							<a className="next" onClick={() => plusSlides(1)}>&#10095;</a>
						</div>
						<br />
                
						{/* <!-- The dots/circles --> */}
						<div className='text-center'>
							<span className="dot" onClick={() => currentSlide(1)}></span>
							<span className="dot" onClick={() => currentSlide(2)}></span>
							<span className="dot" onClick={() => currentSlide(3)}></span>
							<span className="dot" onClick={() => currentSlide(4)}></span>
						</div>

						<p className="para">

                  

						</p>
					</div>
				</div>
			</section>

                
			<section className="page-section bg-cinco" id="review">
				<div className="container">
					<h2 className="text-center mt-0">REVIEWS</h2>
					<hr className="divider my-4" />
					<div className="skillsutility">
						<div className="row2">
							<div className="column2">
								<img src="../../assets/Review1.jpg" alt="Review 1" className='w-full'/>
							</div>
							<div className="column2">
								<img src="../../assets/Review2.jpg" alt="Review 2"
									className='w-full' />
							</div>
							<div className="column2">
								<img src="../../assets/Review3.jpg"
									alt="Review 3"
									className='w-full' />
							</div>
							<div className="column2">
								<img src="../../assets/Review4.jpg"
									alt="Review 4"
									className='w-full' />
							</div>
							<div className="column2">
								<img src="../../assets/Review5.jpg"
									alt="Review 5"
									className='w-full' />
							</div>
							<div className="column2">
								<img src="../../assets/Review6.jpg"
									alt="Review 6"
									className='w-full' />
							</div>
							<div className="column2">
								<img src="../../assets/Review7.jpg"
									alt="Review 7"
									className='w-full' />
							</div>
							<div className="column2">
								<img src="../../assets/Review8.jpg"
									alt="Review 8"
									className='w-full' />
							</div>
						</div>
  
						{/* <!-- <p className="para">
                    </p>--> */}
					</div>

				</div>
			</section>

			{/* <!-- Call to action--> */}
			<section className="page-section bg-dark text-white">
				<div className="container text-center">
				</div>
			</section>
			{/* <!-- Contact--> */}
        
			<section className="page-section" id="contact">
				<div className="black">
					<br />
				</div>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-8 text-center">
							<h2 className="mt-0">CONTACT INFORMATION</h2>
							<hr className="divider my-4" />
							<br />
                       
							{/* <!--<p className="pcontrol">Headquarters: 21319 NE 103rd Street, Suite 222
                Miami, FL 33122</p></p>--> */}
							<br />
							<p className="text-blah mb-5">
								<img src="../../assets/GEContact.png" alt="Contact Information" width="1200" height="600" />
							</p>
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
				<h3 className="bg-light py-5">
					<div className="container">
						<div className="small text-center text-muted">Copyright © 2022 - Gilderise Enterprises</div>
					</div>
					<div className="citinginfo">
						<p className="parainfo"><cite></cite>
							<br />
							<cite></cite>
							<br />
							<cite></cite></p></div>
				</h3>
			</footer>
               

		</div >
	)
}

export default LandingPageContent