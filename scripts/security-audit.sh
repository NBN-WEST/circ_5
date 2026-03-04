#!/bin/bash

echo "Security Audit - Circolo delle Quinte"
echo "========================================"

# Check dependencies
echo "Checking dependencies for vulnerabilities..."
npm audit

# Check for hardcoded secrets
echo "Checking for hardcoded secrets..."
if grep -r "sk-ant-\|api_key\|password\|secret" src/ --exclude-dir=node_modules; then
  echo "WARNING: Potential secrets found in code!"
else
  echo "No hardcoded secrets found"
fi

# Verify CSP
echo "Verifying Content Security Policy..."
if grep -n "Content-Security-Policy" index.html; then
  echo "CSP configured"
else
  echo "CSP NOT configured!"
fi

# Check Electron security
echo "Verifying Electron security..."
if grep -n "contextIsolation: true" electron/main.ts && \
   grep -n "nodeIntegration: false" electron/main.ts && \
   grep -n "sandbox: true" electron/main.ts; then
  echo "Electron security properly configured"
else
  echo "Electron security issues detected!"
fi

echo ""
echo "Security audit completed"
