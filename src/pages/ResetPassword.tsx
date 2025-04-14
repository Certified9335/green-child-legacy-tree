
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResetPasswordForm from '@/components/authentication/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 bg-muted/30">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border">
            <ResetPasswordForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResetPassword;
