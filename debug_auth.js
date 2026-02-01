/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pzblttqrclvjascasxci.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6Ymx0dHFyY2x2amFzY2FzeGNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2MDMxOTAsImV4cCI6MjA4MjE3OTE5MH0.nX505TLcWOvkX1cDN8o6q-dbR4PFNuKJPyFPAAmsY88'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testSignup() {
  console.log('Testing signInWithOtp...')
  const email = 'test_antigravity@example.com'
  
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:5173', 
      },
    })

    if (error) {
        console.error('Error returned object:', JSON.stringify(error, null, 2))
    } else {
        console.log('Success! Data:', data)
    }
  } catch (err) {
      console.error('Exception thrown:', err)
  }
}

testSignup()
