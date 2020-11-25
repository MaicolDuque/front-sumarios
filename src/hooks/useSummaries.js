import { useContext, useState, useEffect } from "react";
import axios from "axios";

import { ContextCreate } from "../Auth/Context";
import { getAllSummaries } from "../services/summaryService";

export default function useSummaries(idEditor) {
  const [resfresh, setRefresh] = useState(false)
  const { token } = useContext(ContextCreate);
  const [summaries, setSummaries] = useState([])
  const [userId, setUserId] = useState(idEditor)
  const [cargandoSummaries, setCargandoSummaries] = useState(false)

  useEffect(() => {
    if (userId) {
      setCargandoSummaries(true)
      getAllSummaries(userId, token)
        .then((res) => { setSummaries(res.data); setCargandoSummaries(false) })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            console.error(error);
          }
        })
    }
  }, [userId, resfresh])

  return { summaries, cargandoSummaries, setRefresh, resfresh, setUserId, userId }
}
