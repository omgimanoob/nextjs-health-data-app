"use client";

import { useEffect } from 'react';
import $ from 'jquery';

function BootstrapClient() {
  useEffect(() => {
    // Ensure jQuery is globally available
    window.jQuery = $;
    window.$ = $;

    // Dynamically load scripts if not already loaded
    if (typeof window !== "undefined") {
      import('bootstrap/dist/js/bootstrap.bundle.min.js').then(() => {
        console.log("Bootstrap loaded");
      }).catch(err => console.error("Failed to load Bootstrap", err));
      
      import('bootstrap-table/dist/bootstrap-table.min.js').then(() => {
        console.log("Bootstrap Table loaded");
      }).catch(err => console.error("Failed to load Bootstrap Table", err));
    }
  }, []);

  return null;
}

export default BootstrapClient;
