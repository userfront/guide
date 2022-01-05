<template>
  <div>
    <el-popover
      v-if="type === 'admin-only'"
      width="340"
      trigger="hover"
      placement="bottom-start"
    >
      <el-button slot="reference" class="danger">admin only</el-button>
      <slot>
        <div style="word-break:normal">
          This endpoint requires admin-level access with one of the following:
          <ul>
            <li>
              Admin API key (
              <code
                style="color:#6b7490;padding:0.25rem 0.5rem;margin:0;font-size:0.85em;background-color:rgba(27,31,35,0.05);border-radius:3px;"
                >uf_live_admin_...</code
              >
              )
            </li>
            <li>JWT access token with admin role in the tenant</li>
          </ul>
        </div>
      </slot>
    </el-popover>

    <el-popover
      v-if="type === 'admin-or-readonly'"
      width="340"
      trigger="hover"
      placement="bottom-start"
    >
      <el-button slot="reference" class="primary">admin or readonly</el-button>
      <slot>
        <div style="word-break:normal">
          This endpoint requires admin or readonly access with one of the
          following:
          <ul>
            <li>
              Admin API key (
              <code
                style="color:#6b7490;padding:0.25rem 0.5rem;margin:0;font-size:0.85em;background-color:rgba(27,31,35,0.05);border-radius:3px;"
                >uf_live_admin_...</code
              >
              )
            </li>
            <li>
              Readonly API key (
              <code
                style="color:#6b7490;padding:0.25rem 0.5rem;margin:0;font-size:0.85em;background-color:rgba(27,31,35,0.05);border-radius:3px;"
                >uf_live_readonly_...</code
              >
              )
            </li>
            <li>JWT access token with admin role in the tenant</li>
            <li>JWT access token with member role in the tenant</li>
          </ul>
        </div>
      </slot>
    </el-popover>

    <el-popover
      v-if="type === 'public'"
      width="320"
      trigger="hover"
      placement="bottom-start"
    >
      <el-button slot="reference" class="success">public</el-button>
      <slot>
        <div style="word-break:normal">
          This endpoint is publicly accessible.<br />It does not require
          authentication.
        </div>
      </slot>
    </el-popover>
  </div>
</template>

<script>
import { Link, Popover } from "element-ui";

export default {
  props: ["type"],
  components: {
    [Link.name]: Link,
    [Popover.name]: Popover,
  },
};
</script>

<style lang="scss" scoped>
.el-popover__reference-wrapper > button {
  font-size: 13px;
  padding: 6px 8px;
  margin-top: 6px;
  background-color: rgba(27, 31, 35, 0.05);
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: none;
  border: none;
  &.danger {
    color: #fb6340;
  }
  &.primary {
    color: #5e72e4;
  }
  &.success {
    color: #23a06a;
  }
  &:hover,
  &:focus {
    text-decoration: underline;
  }
}
</style>
