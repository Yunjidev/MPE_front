import UsersList from '../../components/DashboardAdmin/UsersList'; // Adjust the import path if necessary

const UsersPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Users Management</h1>
      <UsersList />
    </div>
  );
};

export default UsersPage;
