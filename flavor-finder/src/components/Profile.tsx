
// Profile Component (Protected)
const Profile = () => (
  <section className="py-10 bg-gray-200">
    <h2 className="text-3xl font-bold text-center mb-6">User Profile</h2>
    <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
      <h3 className="text-2xl font-bold">User Name</h3>
      <p>Favorite Recipes:</p>
      <ul className="list-disc pl-6">
        <li>Recipe 1</li>
        <li>Recipe 2</li>
        <li>Recipe 3</li>
      </ul>
    </div>
  </section>
);

export default Profile;
