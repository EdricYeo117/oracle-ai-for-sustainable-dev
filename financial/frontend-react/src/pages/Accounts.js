import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: #121212;
  color: #ffffff;
  width: 100%;
  height: 100vh;
  padding: 20px;
  overflow-y: auto;
`;

const Form = styled.form`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #1e1e1e;
  color: #ffffff;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #2c2c2c;
  color: #ffffff;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #16a085;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #444;
  padding: 8px;
  background-color: #1e1e1e;
  color: #ffffff;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #444;
  padding: 8px;
  color: #ffffff;
`;

const CollapsiblePanel = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #1e1e1e;
  color: #ffffff;
`;

const ToggleButton = styled.button`
  background-color: #1abc9c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #16a085;
  }
`;

const SidePanel = styled.div`
  border: 1px solid #444;
  padding: 10px;
  border-radius: 8px;
  background-color: #1e1e1e;
  color: #ffffff;
  margin-top: 20px;
`;

const REACT_APP_MERN_MONGODB_SERVICE_URL = process.env.REACT_APP_MERN_MONGODB_SERVICE_URL || 'http://localhost:8080';
const REACT_APP_MERN_MONGODB_JSONDUALITY_ORACLE_SERVICE_URL =
  process.env.REACT_APP_MERN_MONGODB_JSONDUALITY_ORACLE_SERVICE_URL || 'http://localhost:5000';
const REACT_APP_MERN_SQL_ORACLE_SERVICE_URL =
  process.env.REACT_APP_MERN_SQL_ORACLE_SERVICE_URL || 'http://localhost:6000';

const Accounts = () => {
  const [formData, setFormData] = useState({
    _id: '',
    accountName: '',
    accountType: '',
    customerId: '',
    accountOpenedDate: new Date().toISOString().split('T')[0],
    accountOtherDetails: '',
    accountBalance: '',
    writeOption: 'MongoDB API accessing Oracle Database', // Default write option
    readOption: 'SQL',  // Default read option
  });
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeveloperDetails, setShowDeveloperDetails] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let postUrl;
    if (formData.writeOption === 'SQL') {
      postUrl = `${REACT_APP_MERN_SQL_ORACLE_SERVICE_URL}/api/accounts`;
    } else if (formData.writeOption === 'MongoDB API') {
      postUrl = `${REACT_APP_MERN_MONGODB_SERVICE_URL}/api/accounts`;
    } else if (formData.writeOption === 'MongoDB API accessing Oracle Database') {
      postUrl = `${REACT_APP_MERN_SQL_ORACLE_SERVICE_URL}/api/accounts`;
    }

    const payload = {
      ...formData,
      accountId: formData._id,
      accountCustomerId: formData.customerId,
    };

    try {
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Account created successfully!');
        setFormData({
          _id: '',
          accountName: '',
          accountType: '',
          customerId: '',
          accountOpenedDate: new Date().toISOString().split('T')[0],
          accountOtherDetails: '',
          accountBalance: '',
          writeOption: 'MongoDB API accessing Oracle Database',
          readOption: 'SQL',
        });
        fetchAccounts(); // Refresh the accounts table
      } else {
        const errorText = await response.text();
        alert(`Failed to create account: ${errorText}`);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('An error occurred while creating the account.');
    }
  };

  const fetchAccounts = async () => {
    let fetchUrl;
    if (formData.readOption === 'SQL') {
      fetchUrl = `${REACT_APP_MERN_SQL_ORACLE_SERVICE_URL}/accounts`;
    } else if (formData.readOption === 'MongoDB API') {
      fetchUrl = `${REACT_APP_MERN_MONGODB_SERVICE_URL}/accounts`;
    } else if (formData.readOption === 'MongoDB API accessing Oracle Database') {
      fetchUrl = `${REACT_APP_MERN_SQL_ORACLE_SERVICE_URL}/accounts`;
    }

    try {
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : [];
      setAccounts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
    // eslint-disable-next-line
  }, [formData.readOption]);

  return (
    <PageContainer>
      <h2>Process: Create and view accounts</h2>
      <h2>Tech: MongoDB/MERN stack with JSON Duality</h2>
      <h2>Reference: Decimal Point Analytics</h2>

      {/* Collapsible Developer Details Panel */}
      <SidePanel>
        <ToggleButton onClick={() => setShowDeveloperDetails(!showDeveloperDetails)}>
          {showDeveloperDetails ? 'Hide Developer Details' : 'Show Developer Details'}
        </ToggleButton>
        {!showDeveloperDetails && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, marginRight: '20px' }}>
              <div>
                <a
                  href="https://paulparkinson.github.io/converged/microservices-with-converged-db/workshops/freetier-financial/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1abc9c', textDecoration: 'none' }}
                >
                  Click here for workshop lab and further information
                </a>
              </div>
              <div>
                <a
                  href="https://github.com/paulparkinson/oracle-ai-for-sustainable-dev/tree/main/financial/bank-account-management-mern"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1abc9c', textDecoration: 'none' }}
                >
                  Direct link to source code on GitHub
                </a>
              </div>
              <h4>Financial Process:</h4>
              <ul>
                <li>Create and view accounts</li>
              </ul>
              <h4>Developer Notes:</h4>
              <ul>
                <li>Uses MongoDB/MERN stack for account management</li>
                <li>Connected to Oracle JSON Duality View via MongoDB API</li>
                <li>Query the same data using SQL or MongoDB API</li>
              </ul>
              <h4>Differentiators:</h4>
              <ul>
                <li>Oracle Database JSON Duality provides the ability to use JSON, SQL, and Graph operations (read and write) against the same data</li>
                <li>Oracle Database can be accessed via MongoDB API by simply changing the URL to point to Oracle Database (no code changes required)</li>
              </ul>
            </div>
            <div style={{ flexShrink: 0, width: '40%' }}>
              <h4>Walkthrough Video:</h4>
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/3p8X-i1y43U"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '8px', border: '1px solid #444' }}
              ></iframe>
            </div>
          </div>
        )}
      </SidePanel>

      {/* Create Account Form */}
      <Form onSubmit={handleSubmit}>
        <h3>Create Account</h3>
        <Label htmlFor="_id">Account ID</Label>
        <Input
          type="text"
          id="_id"
          name="_id"
          value={formData._id}
          onChange={handleChange}
          placeholder="Enter account ID"
          required
        />

        <Label htmlFor="accountName">Account Name</Label>
        <Input
          type="text"
          id="accountName"
          name="accountName"
          value={formData.accountName}
          onChange={handleChange}
          placeholder="Enter account name"
          required
        />

        <Label htmlFor="accountType">Account Type</Label>
        <select
          id="accountType"
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            marginBottom: '16px',
            padding: '8px',
            border: '1px solid #555',
            borderRadius: '4px',
            backgroundColor: '#2c2c2c',
            color: '#ffffff'
          }}
        >
          <option value="" disabled>Select account type</option>
          <option value="checking">checking</option>
          <option value="savings">savings</option>
          <option value="brokerage">brokerage</option>
        </select>

        <Label htmlFor="customerId">Customer ID</Label>
        <Input
          type="text"
          id="customerId"
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          placeholder="Enter customer ID"
          required
        />

        <Label htmlFor="accountOpenedDate">Opened Date</Label>
        <Input
          type="date"
          id="accountOpenedDate"
          name="accountOpenedDate"
          value={formData.accountOpenedDate}
          onChange={handleChange}
          required
        />

        <Label htmlFor="accountOtherDetails">Other Details</Label>
        <Input
          type="text"
          id="accountOtherDetails"
          name="accountOtherDetails"
          value={formData.accountOtherDetails}
          onChange={handleChange}
          placeholder="Enter other details"
        />

        <Label htmlFor="accountBalance">Balance</Label>
        <Input
          type="number"
          id="accountBalance"
          name="accountBalance"
          value={formData.accountBalance}
          onChange={handleChange}
          placeholder="Enter balance"
          required
        />

        {/* Write Data Using */}
        <h4>Write data using...</h4>
        <div>
          <label>
            <input
              type="radio"
              name="writeOption"
              value="MongoDB API"
              checked={formData.writeOption === 'MongoDB API'}
              onChange={handleChange}
            />
            MongoDB API
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              name="writeOption"
              value="SQL"
              checked={formData.writeOption === 'SQL'}
              onChange={handleChange}
            />
            SQL
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              name="writeOption"
              value="MongoDB API accessing Oracle Database"
              checked={formData.writeOption === 'MongoDB API accessing Oracle Database'}
              onChange={handleChange}
            />
            MongoDB API accessing Oracle Database
          </label>
        </div>

        <div style={{ height: '20px' }}></div> {/* Add space before the button */}

        <Button type="submit">Create Account</Button>

        {/* Read Data Using */}
        <h4 style={{ marginTop: '32px' }}>Read data using...</h4>
        <div>
          <label>
            <input
              type="radio"
              name="readOption"
              value="MongoDB API"
              checked={formData.readOption === 'MongoDB API'}
              onChange={handleChange}
            />
            MongoDB API
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              name="readOption"
              value="SQL"
              checked={formData.readOption === 'SQL'}
              onChange={handleChange}
            />
            SQL
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              name="readOption"
              value="MongoDB API accessing Oracle Database"
              checked={formData.readOption === 'MongoDB API accessing Oracle Database'}
              onChange={handleChange}
            />
            MongoDB API accessing Oracle Database
          </label>
        </div>
      </Form>

      {/* Table to display all accounts */}
      {loading ? (
        <p>Loading accounts...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <TableHeader>Account ID</TableHeader>
              <TableHeader>Account Name</TableHeader>
              <TableHeader>Account Type</TableHeader>
              <TableHeader>Customer ID</TableHeader>
              <TableHeader>Opened Date</TableHeader>
              <TableHeader>Other Details</TableHeader>
              <TableHeader>Balance</TableHeader>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.accountId}>
                <TableCell>{account.accountId || account._id || 'N/A'}</TableCell>
                <TableCell>{account.accountName || 'N/A'}</TableCell>
                <TableCell>{account.accountType || 'N/A'}</TableCell>
                <TableCell>{account.accountCustomerId || account.customerId || 'N/A'}</TableCell>
                <TableCell>{account.accountOpenedDate || 'N/A'}</TableCell>
                <TableCell>{account.accountOtherDetails || 'N/A'}</TableCell>
                <TableCell>{account.accountBalance}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </PageContainer>
  );
};

export default Accounts;
