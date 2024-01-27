import { Modal, Button, Checkbox, Input } from "antd";
import { useEffect, useState } from "react";
import useAxiosPublic from "./hooks/axiosPublic";
import axios from "axios";

const Problem2 = () => {
  // ... existing state variables ...

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [usContacts, setUsContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  const [modalAVisible, setModalAVisible] = useState(false);
  const [modalBVisible, setModalBVisible] = useState(false);
  const [modalCVisible, setModalCVisible] = useState(false);

  const axiosPublic = useAxiosPublic();

  const fetchUsContacts = async () => {
    try {
      const response = await axios.get(
        "https://contact.mediusware.com/api/country-contacts/United%20States/",
        {
          headers: {
            accept: "application/json",
            "X-CSRFToken":
              "O5a0du3ZBfXZ0hxIptlRxkfQVMChL8XrNjqSu63P7oyL4sQ0g6fdPrlEB9dNcHcb",
          },
        }
      );
      setUsContacts(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchContacts = async (searchTerm) => {
    try {
      const response = await axios.get(
        `https://contact.mediusware.com/api/contacts/?search=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            accept: "application/json",
            "X-CSRFToken":
              "O5a0du3ZBfXZ0hxIptlRxkfQVMChL8XrNjqSu63P7oyL4sQ0g6fdPrlEB9dNcHcb",
          },
        }
      );

      setContacts(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsContacts();
    fetchContacts(searchTerm);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    fetchContacts(e.target.value);
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      fetchContacts(searchTerm);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div
          className="d-flex justify-content-center gap-3"
          onScroll={handleScroll}
        >
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={() => setModalAVisible(true)}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => setModalBVisible(true)}
          >
            US Contacts
          </button>
          <Modal
            className=""
            visible={modalAVisible}
            onCancel={() => setModalAVisible(false)}
          >
            <Input
              className="form-control mt-4"
              placeholder="Search contacts"
              onChange={handleSearchChange}
            />
            {contacts.map((contact) => (
              <div key={contact.id}>
                <p>{contact.phone}</p>
                <Button
                  className="btn btn-info"
                  onClick={() => {
                    setSelectedContact(contact);
                    setModalCVisible(true);
                  }}
                >
                  View Details
                </Button>
              </div>
            ))}
            {loading && <p>Loading...</p>}
          </Modal>

          <Modal
            visible={modalBVisible}
            onCancel={() => setModalBVisible(false)}
          >
            <div className="mt-5">
              {usContacts.map((contact) => (
                <div key={contact.id}>
                  <p>{contact.phone}</p>
                  <Button
                    className="btn btn-info"
                    onClick={() => {
                      setSelectedContact(contact);
                      setModalCVisible(true);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
            {loading && <p>Loading...</p>}
          </Modal>

          <Modal
            visible={modalCVisible}
            onCancel={() => setModalCVisible(false)}
          >
            <h4>Contact Details</h4>
            <p>Id: {selectedContact.id}</p>
            <p>Phone: {selectedContact.phone}</p>
            <p>Country: {selectedContact?.country?.name}</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
