#!/usr/bin/env python3
"""Static file server for LAN preview, with caching disabled.

Same as `python3 -m http.server`, except every response gets
Cache-Control: no-store so editing CSS/JS/HTML is reflected on the next
reload — no hard refresh needed, which matters most from a phone on the
same network, invoked by scripts/serve-lan.js.
"""

import http.server
import os
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3025
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


class ReusableTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    """Threaded on purpose: TCPServer answers one request at a time, so the page's assets
    queue up behind each other. With no-store on every response that queue is paid at each
    reload, and the stylesheet can land after the browser has given up waiting and painted
    the page unstyled."""

    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    with ReusableTCPServer(("0.0.0.0", PORT), NoCacheHandler) as httpd:
        httpd.serve_forever()
