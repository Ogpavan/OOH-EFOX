import BackButton from '@/components/ui/BackButton'
import React from 'react'

export default function preferences() {
  return (
     <div className="flex items-center py-5">
    
            <BackButton />
            <h2 className="text-xl font-light tracking-tight">
              Manage{" "}
              <span className="font-bold text-3xl" style={{ color: "#EC5800" }}>
                Preferences
              </span>
            </h2>
          </div>
  )
}
