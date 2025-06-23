const axios = require('axios');

const BASE_URL = 'http://localhost:5000';


const testTodo = {
  Title: 'Test Todo',
  Description: 'This is a test todo item',
  Priority: 'M',
  StatusType: 'A',
  BucketID: 1,
  AssignTo: 1,
  CID: 1
};

async function testTodoAPI() {
  console.log('🧪 Testing Todo API...\n');

  try {

    console.log('1. Testing GET /todos');
    const getAllResponse = await axios.get(`${BASE_URL}/todos`);
    console.log('✅ Get all todos:', getAllResponse.status);
    console.log('   Count:', getAllResponse.data.length, '\n');

    // Test 2: Create a new todo
    console.log('2. Testing POST /todos');
    const createResponse = await axios.post(`${BASE_URL}/todos`, testTodo);
    console.log('✅ Create todo:', createResponse.status);
    console.log('   Created ID:', createResponse.data.ToDoId, '\n');

    const todoId = createResponse.data.ToDoId;

    // Test 3: Get todo by ID
    console.log('3. Testing GET /todos/:id');
    const getByIdResponse = await axios.get(`${BASE_URL}/todos/${todoId}`);
    console.log('✅ Get todo by ID:', getByIdResponse.status);
    console.log('   Title:', getByIdResponse.data.Title, '\n');

    // Test 4: Update todo
    console.log('4. Testing PUT /todos/:id');
    const updateData = { Title: 'Updated Test Todo', Description: 'Updated description' };
    const updateResponse = await axios.put(`${BASE_URL}/todos/${todoId}`, updateData);
    console.log('✅ Update todo:', updateResponse.status);
    console.log('   Updated Title:', updateResponse.data.Title, '\n');

    // Test 5: Update todo status
    console.log('5. Testing PUT /todos/:id/status');
    const statusResponse = await axios.put(`${BASE_URL}/todos/${todoId}/status`, { status: 'C' });
    console.log('✅ Update todo status:', statusResponse.status);
    console.log('   New Status:', statusResponse.data.StatusType, '\n');

    // Test 6: Get todos by assignee
    console.log('6. Testing GET /todos/assignee/:userId');
    const assigneeResponse = await axios.get(`${BASE_URL}/todos/assignee/1`);
    console.log('✅ Get todos by assignee:', assigneeResponse.status);
    console.log('   Count:', assigneeResponse.data.length, '\n');

    // Test 7: Get todos by bucket
    console.log('7. Testing GET /todos/bucket/:bucketId');
    const bucketResponse = await axios.get(`${BASE_URL}/todos/bucket/1`);
    console.log('✅ Get todos by bucket:', bucketResponse.status);
    console.log('   Count:', bucketResponse.data.length, '\n');

    // Test 8: Delete todo
    console.log('8. Testing DELETE /todos/:id');
    const deleteResponse = await axios.delete(`${BASE_URL}/todos/${todoId}`);
    console.log('✅ Delete todo:', deleteResponse.status, '\n');

    console.log('🎉 All Todo API tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
  }
}

// Run the tests
testTodoAPI(); 