import axios from "axios";

const fetchContacts = async (searchTerm) => {
  try {
    const response = await axios.get(
      `https://contact.mediusware.com/api/contacts?search=${searchTerm}`,
      {
        headers: {
          accept: "application/json",
          "X-CSRFToken":
            "O5a0du3ZBfXZ0hxIptlRxkfQVMChL8XrNjqSu63P7oyL4sQ0g6fdPrlEB9dNcHcb",
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default fetchContacts;