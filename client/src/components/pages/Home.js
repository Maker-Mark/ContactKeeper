import React from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";

const Home = () => {
  return (
    <div>
      <div className="grid-2">
        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>
        <div>
          <Contacts />
        </div>
        <div />
      </div>
    </div>
  );
};

export default Home;
