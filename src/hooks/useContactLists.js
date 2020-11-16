import { useContext, useState, useEffect } from "react";
import axios from "axios";

import { ContextCreate } from "../Auth/Context";
import { getListsByEditor } from "../services/contactsService";

export default function useContactLists() {
  const { infoUser, token } = useContext(ContextCreate);
  const [contactLists, setContactLists] = useState([])

  useEffect(() => {
    getListsByEditor(infoUser._id, token)
      .then((res) => setContactLists(res.data.mg_contact_lists))
      .catch((error) => {
        if (!axios.isCancel(error)) {
          console.error(error);
        }
      })
  }, [])

  return { contactLists }
}