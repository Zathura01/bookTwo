import { useState } from "react";

function Inputuser(initialValue) {
  const [user, setUser] = useState(initialValue ?? '');

  const handleChange = (e) => {
    setUser(e.target.value);
  };

  const reset = () => {
    setUser(initialValue);
  };

  return {
    user,
    handleChange,
    reset,
    bind: {
      value: user,
      onChange: handleChange,
    },
    setUser
  };
}

export default Inputuser;
