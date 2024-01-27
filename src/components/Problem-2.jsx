import { Modal, Button, Checkbox, Input } from "antd";
import { useEffect, useState } from "react";
import useAxiosPublic from "./hooks/axiosPublic";

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
      const response = await axiosPublic.get("/api/contacts?country=US");
      setUsContacts(response.data);
    } catch (error) {
      console.error("Error fetching US contacts:", error);
    }
  };

  useEffect(() => {
    fetchUsContacts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    fetchContacts(e.target.value);
  };

  const fetchContacts = async (searchTerm = "") => {
    setLoading(true);
    try {
      const response = await axiosPublic.get(
        `/api/contacts?search=${searchTerm}&page=${currentPage}`
      );
      setContacts((prevContacts) => [...prevContacts, ...response.data]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      fetchContacts(searchTerm);
    }
  };

  return (
    <div className="container" onScroll={handleScroll}>
      <Button
        className="btn btn-primary"
        onClick={() => setModalAVisible(true)}
      >
        All Contacts
      </Button>
      <Button
        className="btn btn-warning"
        onClick={() => setModalBVisible(true)}
      >
        US Contacts
      </Button>
      <Modal visible={modalAVisible} onCancel={() => setModalAVisible(false)}>
        <Input
          className="form-control"
          placeholder="Search contacts"
          onChange={handleSearchChange}
        />
        {contacts.map((contact) => (
          <div key={contact.id}>
            <p>{contact.name}</p>
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

      <Modal visible={modalBVisible} onCancel={() => setModalBVisible(false)}>
        {usContacts.map((contact) => (
          <div key={contact.id}>
            <p>{contact.name}</p>
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

      <Modal visible={modalCVisible} onCancel={() => setModalCVisible(false)}>
        <p>{selectedContact.name}</p>
        <p>{selectedContact.email}</p>
        <p>{selectedContact.phone}</p>
        <p>{selectedContact.address}</p>
        <p>{selectedContact.country}</p>
      </Modal>
    </div>
  );
};

export default Problem2;
