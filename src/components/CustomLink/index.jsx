import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { ContextCreate } from '../../Auth/Context';

export default function CustomLink(props) {
  const { infoUser } = useContext(ContextCreate);
  const [returnedLink, setReturnedLink] = useState(null);

  useEffect(() => {
    switch (props.condition) {
      case "admin":
        return setReturnedLink(
          infoUser.mg_role === "admin" ? <Link {...props}>{props.children}</Link> : null
        );
      case "editor":
        return setReturnedLink(
          infoUser.mg_role === "editor" ? <Link {...props}>{props.children}</Link> : null
        );
      default:
        return setReturnedLink(<Link {...props}>{props.children}</Link>);
    }
  }, [infoUser]);
  return <>{returnedLink}</>
}