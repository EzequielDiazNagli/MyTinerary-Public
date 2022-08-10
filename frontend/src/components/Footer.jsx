import React from "react"
import "../style/style.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavBarFooter from "./NavBarFooter"

function Footer() {

    return (
        <footer>
            <div className="footer-a">
                <div className="social-media">
                    <InstagramIcon />
                    <FacebookIcon />
                    <WhatsAppIcon />
                </div>
                <div className="footer-logo">
                    <h4>MyTinerary</h4>
                    <NavBarFooter />
                </div>
                <div className="contact">
                    <CallIcon />
                    <EmailIcon />
                    <LocationOnIcon />
                </div>
            </div>
        </footer>
    )
}

export default Footer